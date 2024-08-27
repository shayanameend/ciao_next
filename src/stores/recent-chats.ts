import { map, onMount } from "nanostores";
import { socketStore } from "~/stores/socket";
import { default as events } from "~/lib/events";
import type { Socket } from "socket.io-client";

export const recentChatsStore = map<{
	online: unknown[];
	offline: unknown[];
	privateChats: unknown[];
	groupChats: unknown[];
}>({
	online: [],
	offline: [],
	privateChats: [],
	groupChats: [],
});

onMount(recentChatsStore, () => {
	const { instance } = socketStore.get();

	if (instance) {
		instance.on(events.recentChats.users.online, (data) => {
			recentChatsStore.setKey("online", data);
		});

		instance.on(events.recentChats.users.offline, (data) => {
			recentChatsStore.setKey("offline", data);
		});

		instance.on(events.recentChats.privateChats.receive, (data) => {
			recentChatsStore.setKey("privateChats", data);
		});

		instance.on(events.recentChats.groupChats.receive, (data) => {
			recentChatsStore.setKey("groupChats", data);
		});
	}
});

export function onRecentChatsUnMount(instance: Socket | null) {
	if (instance) {
		instance.off(events.recentChats.users.online);
		instance.off(events.recentChats.users.offline);
		instance.off(events.recentChats.privateChats.receive);
		instance.off(events.recentChats.groupChats.receive);
	}
}
