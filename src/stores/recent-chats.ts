import { map } from "nanostores";
import type { RecentChatsResponse } from "~/validators/chat.validators";

export const recentChatsStore = map<{
	onlineUsers: RecentChatsResponse["onlineUsers"];
	privateChats: RecentChatsResponse["privateChats"];
	groupChats: RecentChatsResponse["groupChats"];
	isJoined: boolean;
}>({
	onlineUsers: [],
	privateChats: [],
	groupChats: [],
	isJoined: false,
});

export function updateOnlineUsers({
	onlineUsers,
}: {
	onlineUsers: RecentChatsResponse["onlineUsers"];
}) {
	recentChatsStore.setKey("onlineUsers", [
		...recentChatsStore.get().onlineUsers,
		...onlineUsers,
	]);
}

export function updateOfflineUser({
	offlineUser,
}: {
	offlineUser: RecentChatsResponse["onlineUsers"][number];
}) {
	recentChatsStore.setKey("onlineUsers", [
		...recentChatsStore
			.get()
			.onlineUsers.filter((user) => user.id !== offlineUser.id),
	]);
}

export function updatePrivateChats({
	privateChats,
}: {
	privateChats: RecentChatsResponse["privateChats"];
}) {
	recentChatsStore.setKey("privateChats", [...privateChats]);
}

export function updateGroupChats({
	groupChats,
}: {
	groupChats: RecentChatsResponse["groupChats"];
}) {
	recentChatsStore.setKey("groupChats", [...groupChats]);
}
