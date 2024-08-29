"use client";

import { useRecentChats } from "~/hooks/use-recent-chats";
import { RecentsChats } from "./_components/recents-chats";

export default function RecentChatsPage() {
	const { onlineUsers, privateChats, groupChats } = useRecentChats();

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
