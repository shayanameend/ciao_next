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
	const { room } = useStore(privateChatStore);

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
		if (instance && isConnected) {
			instance
				.emitWithAck(events.privateChat.room.join, {
					roomId,
				})
				.then(({ data, error }) => {
					if (error) {
						throw new Error(error);
					}

					updatePrivateChat(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}

		return () => {
			if (instance && isConnected) {
				instance.emit(events.privateChat.room.leave, {
					roomId,
				});
			}
		};
	}, [instance, isConnected, roomId]);

	return {
		isConnected,
		error,
		instance,
		room,
	};
}
