import { map } from "nanostores";
import type { ChatRoomResponse, Message } from "~/validators/chat.validators";

export const privateChatStore = map<ChatRoomResponse>();

export function updatePrivateChat(chat: ChatRoomResponse) {
	privateChatStore.setKey("room", chat.room);
}

export function updatePrivateChatMessages(messages: Message[]) {
	const room = privateChatStore.get().room;

	if (!room) {
		return;
	}

	privateChatStore.setKey("room", {
		...room,
		messages,
	});
}

export function updatePrivateChatMessage(message: Message) {
	const room = privateChatStore.get().room;

	if (!room) {
		return;
	}

	privateChatStore.setKey("room", {
		...room,
		messages: (() => {
			const currentMessages = room.messages;

			const existingIndex = currentMessages.findIndex(
				(msg) => msg.id === message.id,
			);

			if (existingIndex !== -1) {
				return currentMessages.map((msg, index) =>
					index === existingIndex ? message : msg,
				);
			}

			return [...currentMessages, message];
		})(),
	});
}
