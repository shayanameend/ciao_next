"use client";

import { ChevronDownIcon } from "lucide-react";
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
import type { RecentChatsResponse } from "~/validators/chat.validators";

const options = [
	{ label: "Archive", value: "arc" },
	{ label: "Delete", value: "del" },
];

export function RecentsChats({
	onlineUsers,
	privateChats,
	groupChats,
}: RecentChatsResponse) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Chats</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-6">
				{privateChats.map((chat) => {
					const fullName = chat.members.find(
						(member) => member.id !== onlineUsers[0]?.id,
					)?.fullName;

					const lastMessage =
						chat.messages[0]?.text?.length > 20
							? `${chat.messages[0]?.text.slice(0, 20)}...`
							: chat.messages[0]?.text;

					return (
						<div
							key={chat.id}
							className="flex items-center justify-between space-x-4"
						>
							<div className="flex items-center space-x-4">
								<Avatar className="h-8 w-8">
									<AvatarFallback>{fullName?.[0]}</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium leading-none">{fullName}</p>
									<p className="text-sm text-muted-foreground">{lastMessage}</p>
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
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
