"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { OsType, Roles } from "~/lib/types";
import { cn } from "~/lib/utils";
import { signUp } from "~/server/auth";

const SignUpFormSchema = zod.object({
	email: zod.string().email().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: zod.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

export function SignUpForm() {
	const router = useRouter();

	const form = useForm<zod.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: zod.infer<typeof SignUpFormSchema>) {
		const response = await signUp({
			email: data.email,
			password: data.password,
			role: Roles.USER,
			deviceType: OsType.WEB,
			deviceToken: "qwertyuiop",
		});

		if (response.meta?.status >= 200 && response.meta?.status < 300) {
			form.reset();

			router.push("/verification");
		}

		toast({
			variant:
				response.meta?.status >= 200 && response.meta?.status < 300
					? "success"
					: "error",
			title: response.meta?.message,
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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email *</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
							</FormControl>
							<FormMessage className="text-red-600" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password *</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} />
							</FormControl>
							<FormMessage className="text-red-600" />
						</FormItem>
					)}
				/>
				<Button className={cn("mt-6 block w-full")} type="submit">
					Sign Up
				</Button>
			</form>
		</Form>
	);
}
