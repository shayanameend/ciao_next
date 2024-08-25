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
import { OsType } from "~/lib/types";
import { cn } from "~/lib/utils";
import { requestSignIn } from "~/server/auth";

const SignInFormSchema = zod.object({
	email: zod.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	password: zod.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

export function SignInForm() {
	const router = useRouter();

	const form = useForm<zod.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: zod.infer<typeof SignInFormSchema>) {
		const response = await requestSignIn({
			email: data.email,
			password: data.password,
			deviceType: OsType.WEB,
			deviceToken: "qwertyuiop",
		});

		if (response.meta.status >= 200 && response.meta.status < 300) {
			form.reset();
		}

		switch (response.meta.message) {
			case "User not verified":
				return router.push("/verification");

			case "Profile not found":
				return router.push("/profile/create");

			case "User logged in successfully":
				return router.push("/");
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
					Sign In
				</Button>
			</form>
		</Form>
	);
}
