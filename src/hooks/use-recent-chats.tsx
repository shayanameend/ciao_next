import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import events from "~/lib/events";
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
	const { onlineUsers, privateChats, groupChats } = useStore(recentChatsStore);

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

	return {
		isConnected,
		error,
		instance,
		onlineUsers,
		privateChats,
		groupChats,
	};
}
