import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { default as events } from "~/lib/events";
import {
	privateChatStore,
	updatePrivateChat,
	updatePrivateChatMessage,
	updatePrivateChatMessages,
} from "~/stores/private-chat";
import { socketStore } from "~/stores/socket";
import { PrivateChatRoomResponse } from "~/validators/chat.validators";

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
			privateChatStore.setKey("isJoined", true);

			(async () => {
				try {
					const { data, error } = await instance.emitWithAck(
						events.privateChat.room.join,
						{
							roomId,
						},
					);

					if (error) {
						throw new Error(error);
					}

					updatePrivateChat(data);
				} catch (error) {
					privateChatStore.setKey("isJoined", false);

					console.error(error);

					if (error instanceof Error) {
						socketStore.setKey("error", error.message);
					}

					socketStore.setKey("error", "Something went wrong");
				}
			})();
		}

		return () => {
			if (instance && isConnected && isJoined) {
				privateChatStore.setKey("isJoined", false);

				instance.emit(events.privateChat.room.leave, {
					roomId,
				});
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
