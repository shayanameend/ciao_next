"use client";

import { useEffect } from "react";
import { useRecentChats } from "~/hooks/use-recent-chats";
import { RecentsChats } from "./_components/recents-chats";

export default function RecentChatsPage() {
	const { onlineUsers, privateChats, groupChats } = useRecentChats();

	useEffect(() => {
		console.log({ onlineUsers }, { privateChats }, { groupChats });
	}, [onlineUsers, privateChats, groupChats]);

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
