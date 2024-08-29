import { Send } from "lucide-react";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import type { PrivateChatRoomResponse } from "~/validators/chat.validators";

interface PrivateChatProps {
	name: string;
	room: PrivateChatRoomResponse["room"];
}

export function PrivateChat({ name, room }: PrivateChatProps) {
	const [messages, setMessages] = useState([...(room?.messages ?? [])]);
	const [input, setInput] = useState("");
	const inputLength = input.trim().length;

	return (
		<Card className="h-full flex flex-col justify-between">
			<CardHeader className="flex flex-row items-center">
				<div className="flex items-center space-x-4">
					<Avatar>
						<AvatarFallback>
							{name
								.split(" ")
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
					{messages.map((message) => (
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
				</div>
				<form className="flex w-full items-center space-x-2">
					<Input
						id="message"
						placeholder="Type your message..."
						className="flex-1"
						autoComplete="off"
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<Button type="submit" size="icon" disabled={inputLength === 0}>
						<Send className="h-4 w-4" />
						<span className="sr-only">Send</span>
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
