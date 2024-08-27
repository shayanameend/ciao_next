import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { toast } from "~/components/ui/use-toast";
import events from "~/lib/events";
import { recentChatsStore } from "~/stores/recent-chats";
import { socketStore } from "~/stores/socket";

export function useRecentChats() {
	const { isConnected, error, instance } = useStore(socketStore);
	const { online, privateChats, groupChats } = useStore(recentChatsStore);

	useEffect(() => {
		if (instance) {
			instance.on(events.recentChats.users.online, ({ onlineUsers }) => {
				recentChatsStore.setKey("online", [...online, ...onlineUsers]);
			});

			instance.on(events.recentChats.users.offline, ({ offlineUser }) => {
				recentChatsStore.setKey(
					"online",
					// @ts-ignore
					online.filter((user) => user.id !== offlineUser.id),
				);
			});

			instance.on(
				events.recentChats.privateChats.receive,
				({ privateChats }) => {
					recentChatsStore.setKey("privateChats", privateChats);
				},
			);

			instance.on(events.recentChats.groupChats.receive, ({ groupChats }) => {
				recentChatsStore.setKey("groupChats", groupChats);
			});
		}

		return () => {
			if (instance) {
				instance.off(events.recentChats.users.online);
				instance.off(events.recentChats.users.offline);
				instance.off(events.recentChats.privateChats.receive);
				instance.off(events.recentChats.groupChats.receive);
			}
		};
	}, [instance, online]);

	useEffect(() => {
		if (isConnected) {
			toast({
				title: "Socket Connection",
				description: "Connected",
			});
		}

		if (error) {
			toast({
				title: "Socket Error",
				description: error,
			});
		}
	}, [isConnected, error]);

	return {
		isConnected,
		error,
		instance,
		online,
		privateChats,
		groupChats,
	};
}
