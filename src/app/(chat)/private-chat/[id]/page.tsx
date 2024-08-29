"use client";

import { useParams } from "next/navigation";
import { usePrivateChat } from "~/hooks/use-private-chat";

export default function PrivateChatPage() {
	const { id } = useParams<{ id: string }>();

	const { room } = usePrivateChat({ roomId: id });

	return <div>Private Chat {room?.id}</div>;
}
