import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { default as events } from "~/lib/events";
import {
	recentChatsStore,
	updateGroupChats,
	updateOfflineUser,
	updateOnlineUsers,
	updatePrivateChats,
} from "~/stores/recent-chats";
import { socketStore } from "~/stores/socket";

export function useRecentChats() {
	const { isConnected, error, instance } = useStore(socketStore);
	const { onlineUsers, privateChats, groupChats, isJoined } =
		useStore(recentChatsStore);

	useEffect(() => {
		if (instance) {
			instance.on(events.recentChats.users.online, updateOnlineUsers);
			instance.on(events.recentChats.users.offline, updateOfflineUser);
			instance.on(events.recentChats.privateChats.receive, updatePrivateChats);
			instance.on(events.recentChats.groupChats.receive, updateGroupChats);
		}

		return () => {
			if (instance) {
				instance.off(events.recentChats.users.online);
				instance.off(events.recentChats.users.offline);
				instance.off(events.recentChats.privateChats.receive);
				instance.off(events.recentChats.groupChats.receive);
			}
		};
	}, [instance]);

	useEffect(() => {
		if (instance && isConnected && !isJoined) {
			recentChatsStore.setKey("isJoined", true);

			instance.emit(events.recentChats.room.join);
		}

		return () => {
			if (instance && isConnected && isJoined) {
				recentChatsStore.setKey("isJoined", false);

				instance.emit(events.recentChats.room.leave);
			}
		};
	}, [instance, isConnected, isJoined]);

	return {
		isConnected,
		error,
		instance,
		isJoined,
		onlineUsers,
		privateChats,
		groupChats,
	};
}
