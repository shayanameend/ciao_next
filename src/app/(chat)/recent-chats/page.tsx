"use client";

import { useRecentChats } from "~/hooks/use-recent-chats";
import { RecentsChats } from "./_components/recents-chats";

export default function RecentChatsPage() {
	const { isJoined, error, onlineUsers, privateChats, groupChats } =
		useRecentChats();

	return (
		<section className="py-6 px-4 h-screen">
			<RecentsChats
				isJoined={isJoined}
				error={error}
				onlineUsers={onlineUsers}
				privateChats={privateChats}
				groupChats={groupChats}
			/>
		</section>
	);
}
