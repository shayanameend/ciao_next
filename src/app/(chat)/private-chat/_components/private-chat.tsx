import { useStore } from "@nanostores/react";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { default as events } from "~/lib/events";
import { cn } from "~/lib/utils";
import { socketStore } from "~/stores/socket";
import type { PrivateChatRoomResponse } from "~/validators/chat.validators";

interface PrivateChatProps {
	name: string;
	isJoined: boolean;
	error: string | null;
	room: PrivateChatRoomResponse["room"];
}

export function PrivateChat({ name, isJoined, error, room }: PrivateChatProps) {
	const { instance } = useStore(socketStore);
	const [input, setInput] = useState("");
	const inputLength = input.trim().length;

	const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (instance && room && inputLength > 0) {
			instance.emit(events.privateChat.message.send, {
				roomId: room.id,
				text: input,
			});

			setInput("");
		}
	};

	return (
		<Card className="h-full flex flex-col justify-between">
			<CardHeader className="flex flex-row items-center">
				<div className="flex items-center space-x-4">
					<Avatar>
						<AvatarFallback>
							{name
								.split("%20")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<p className="text-sm font-medium leading-none">
						{name.split("%20").join(" ")}
					</p>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-4">
					{!isJoined && !error ? (
						<div className="flex items-center justify-center h-full">
							<Loader2Icon className="h-4 w-4 animate-spin" />
						</div>
					) : (
						<>
							{(room?.messages ?? []).map((message) => (
								<div
									key={message.id}
									className={cn(
										"flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
										// biome-ignore lint/correctness/noConstantCondition: <for testing>
										true
											? "ml-auto bg-primary text-primary-foreground"
											: "bg-muted",
									)}
								>
									{message.text}
								</div>
							))}
						</>
					)}
				</div>
				<form
					onSubmit={handleSendMessage}
					className="flex w-full items-center space-x-2"
				>
					<Input
						id="message"
						placeholder="Type your message..."
						className="flex-1"
						autoComplete="off"
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<Button type="submit" size="icon" disabled={inputLength === 0}>
						<SendIcon className="h-4 w-4" />
						<span className="sr-only">Send</span>
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
