"use client";

import { useParams } from "next/navigation";
import { usePrivateChat } from "~/hooks/use-private-chat";
import { PrivateChat } from "../../_components/private-chat";

export default function PrivateChatPage() {
	const { id, name } = useParams<{ id: string; name: string }>();

	const { room } = usePrivateChat({ roomId: id });

	return (
		<section className="py-6 px-4 h-screen">
			<PrivateChat name={name} room={room} />
		</section>
	);
}
