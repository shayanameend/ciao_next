import { map } from "nanostores";

export const recentChatsStore = map<{
	online: unknown[];
	privateChats: unknown[];
	groupChats: unknown[];
}>({
	online: [],
	privateChats: [],
	groupChats: [],
});
