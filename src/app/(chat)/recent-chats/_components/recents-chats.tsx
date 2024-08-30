"use client";

import { ChevronDownIcon, Loader2 } from "lucide-react";
import { default as Link } from "next/link";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { routes } from "~/lib/routes";
import type { RecentChatsResponse } from "~/validators/chat.validators";

const options = [
	{ label: "Archive", value: "arc" },
	{ label: "Delete", value: "del" },
];

interface RecentsChatsProps extends RecentChatsResponse {
	isJoined: boolean;
}

export function RecentsChats({
	isJoined,
	onlineUsers,
	privateChats,
	groupChats,
}: RecentsChatsProps) {
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Recent Chats</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-6">
				{!isJoined ? (
					<div className="flex items-center justify-center h-full">
						<Loader2 className="h-4 w-4 animate-spin" />
					</div>
				) : (
					<>
						{privateChats.map((chat) => {
							const chatName =
								chat.members.find((member) => member.id !== onlineUsers[0]?.id)
									?.fullName || "Unnamed Chat";

							const lastMessage =
								chat.messages[0]?.text?.length > 20
									? `${chat.messages[0]?.text.slice(0, 20)}...`
									: chat.messages[0]?.text;

							return (
								<Link
									key={chat.id}
									href={routes.chats.privateChat(chat.id, chatName)}
									className="flex items-center justify-between space-x-4"
								>
									<div className="flex items-center space-x-4">
										<Avatar className="h-8 w-8">
											<AvatarFallback>
												{chatName
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium leading-none">
												{chatName}
											</p>
											<p className="text-sm text-muted-foreground">
												{lastMessage}
											</p>
										</div>
									</div>
									<Popover>
										<PopoverTrigger asChild>
											<Button variant="outline" size="sm" className="ml-auto">
												<ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="p-0 w-32" align="end">
											<Command>
												<CommandList>
													<CommandGroup>
														{options.map((option) => {
															return (
																<CommandItem
																	key={option.value}
																	className="flex flex-col items-start px-4 py-2"
																>
																	<p>{option.label}</p>
																</CommandItem>
															);
														})}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</Link>
							);
						})}
					</>
				)}
			</CardContent>
		</Card>
	);
}
