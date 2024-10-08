import { map } from "nanostores";
import type {
	Message,
	PrivateChatRoomResponse,
} from "~/validators/chat.validators";

export const privateChatStore = map<{
	room: PrivateChatRoomResponse["room"] | null;
	isJoined: boolean;
}>({
	room: null,
	isJoined: false,
});

export function updatePrivateChat(chat: PrivateChatRoomResponse) {
	privateChatStore.setKey("room", chat.room);
}

export function updatePrivateChatMessages({
	messages,
}: {
	messages: Message[];
}) {
	const room = privateChatStore.get().room;

	if (!room) {
		return;
	}

	privateChatStore.setKey("room", {
		...room,
		messages,
	});
}

export function updatePrivateChatMessage({
	message,
}: {
	message: Message;
}) {
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
