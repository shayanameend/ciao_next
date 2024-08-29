import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import events from "~/lib/events";
import {
	privateChatStore,
	updatePrivateChat,
	updatePrivateChatMessage,
	updatePrivateChatMessages,
} from "~/stores/private-chat";
import { socketStore } from "~/stores/socket";

export function usePrivateChat({ roomId }: { roomId: string }) {
	const { isConnected, error, instance } = useStore(socketStore);
	const { room, isJoined } = useStore(privateChatStore);

	useEffect(() => {
		if (instance) {
			instance.on(
				events.privateChat.messages.receive,
				updatePrivateChatMessages,
			);
			instance.on(events.privateChat.message.receive, updatePrivateChatMessage);
		}

		return () => {
			if (instance) {
				instance.off(events.privateChat.messages.receive);
				instance.off(events.privateChat.message.receive);
			}
		};
	}, [instance]);

	useEffect(() => {
		if (instance && isConnected && !isJoined) {
			instance
				.emitWithAck(events.privateChat.room.join, {
					roomId,
				})
				.then(({ data, error }) => {
					if (error) {
						throw new Error(error);
					}

					privateChatStore.setKey("isJoined", true);

					updatePrivateChat(data);
				})
				.catch((error) => {
					privateChatStore.setKey("isJoined", false);

					console.error(error);
				});
		}

		return () => {
			if (instance && isConnected && isJoined) {
				instance.emit(events.privateChat.room.leave, {
					roomId,
				});

				privateChatStore.setKey("isJoined", false);
			}
		};
	}, [instance, isConnected, isJoined, roomId]);

	return {
		isConnected,
		error,
		instance,
		isJoined,
		room,
	};
}
