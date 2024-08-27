"use client";

import { useEffect } from "react";
import { useRecentChats } from "~/hooks/use-recent-chats";
import events from "~/lib/events";

export default function RecentChatsPage() {
	const { isConnected, error, instance, online, privateChats, groupChats } =
		useRecentChats();

	useEffect(() => {
		console.log(
			{ isConnected },
			{ error },
			{ online },
			{ privateChats },
			{ groupChats },
		);
	}, [isConnected, error, online, privateChats, groupChats]);

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
