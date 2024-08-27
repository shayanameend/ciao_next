import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { toast } from "~/components/ui/use-toast";
import { onRecentChatsUnMount, recentChatsStore } from "~/stores/recent-chats";
import { socketStore } from "~/stores/socket";

export function useRecentChats() {
	const { isConnected, error, instance } = useStore(socketStore);
	const { online, offline, privateChats, groupChats } =
		useStore(recentChatsStore);

	useEffect(() => {
		return () => {
			onRecentChatsUnMount(instance);
		};
	}, [instance]);

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
		offline,
		privateChats,
		groupChats,
	};
}
