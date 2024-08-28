"use client";

import { useEffect } from "react";
import { useRecentChats } from "~/hooks/use-recent-chats";
import events from "~/lib/events";
import { RecentsChats } from "./_components/recents-chats";

export default function RecentChatsPage() {
	const {
		isConnected,
		error,
		instance,
		onlineUsers,
		privateChats,
		groupChats,
	} = useRecentChats();

	useEffect(() => {
		console.log(
			{ isConnected },
			{ error },
			{ onlineUsers },
			{ privateChats },
			{ groupChats },
		);
	}, [isConnected, error, onlineUsers, privateChats, groupChats]);

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
		<section className="py-6 px-4">
			<RecentsChats
				onlineUsers={onlineUsers}
				privateChats={privateChats}
				groupChats={groupChats}
			/>
		</section>
	);
}
