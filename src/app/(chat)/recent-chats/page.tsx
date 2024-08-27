"use client";

import { useEffect } from "react";
import { useRecentChats } from "~/hooks/use-recent-chats";
import events from "~/lib/events";

export default function RecentChatsPage() {
	const {
		isConnected,
		error,
		instance,
		online,
		offline,
		privateChats,
		groupChats,
	} = useRecentChats();

	useEffect(() => {
		console.log(online, offline, privateChats, groupChats);
	}, [online, offline, privateChats, groupChats]);

	useEffect(() => {
		if (isConnected && instance) {
			instance.emit(events.recentChats.room.join);
		}

		return () => {
			if (isConnected && instance) {
				instance.emit(events.recentChats.room.leave);
			}
		};
	}, [isConnected, instance]);

	return (
		<div>
			<h1>Recent Chats</h1>
		</div>
	);
}
