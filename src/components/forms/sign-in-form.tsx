"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { OsType } from "~/lib/types";
import { cn } from "~/lib/utils";
import { requestSignIn } from "~/server/auth";
import { toast } from "../ui/use-toast";

const SignInFormSchema = z.object({
	email: z.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

export function SignInForm() {
	const form = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
		const response = await requestSignIn({
			email: data.email,
			password: data.password,
			deviceType: OsType.WEB,
			deviceToken: "qwertyuiop",
		});

		console.log(response);

		toast({
			title: "User signed in successfully",
			description: "Please check your email for verification",
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
				<Button className={cn("mt-6 block w-full")}>Sign In</Button>
			</form>
		</Form>
	);
}
