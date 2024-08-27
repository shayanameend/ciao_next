"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as zod from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { toast } from "~/components/ui/use-toast";
import { routes } from "~/lib/routes";
import { ResponseMessages } from "~/lib/types";
import { cn } from "~/lib/utils";
import { createProfile } from "~/server/auth";
import { createProfileBodySchema } from "~/validators/auth.validators";

const ProfileFormSchema = createProfileBodySchema;

export function ProfileForm() {
	const router = useRouter();

	const form = useForm<zod.infer<typeof ProfileFormSchema>>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			fullName: "",
			dob: undefined,
		},
	});

	async function onSubmit(data: zod.infer<typeof ProfileFormSchema>) {
		const response = await createProfile({
			fullName: data.fullName,
			dob: data.dob,
		});

		if (response.meta.status >= 200 && response.meta.status < 300) {
			form.reset();
		}

		switch (response.meta.message) {
			case ResponseMessages.PROFILE_CREATED_SUCCESSFULLY:
				return router.push(routes.chats.recentChats);
		}

		toast({
			variant:
				response.meta.status >= 200 && response.meta.status < 300
					? "success"
					: "error",
			title: response.meta.message,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name *</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage className="text-red-600" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dob"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date of Birth *</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className={cn("mt-6 block w-full")} type="submit">
					Create Profile
				</Button>
			</form>
		</Form>
	);
}
