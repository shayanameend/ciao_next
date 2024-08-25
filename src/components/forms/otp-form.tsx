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
import { routes } from "~/lib/routes";
import { OtpType, ResponseMessages } from "~/lib/types";
import { cn } from "~/lib/utils";
import { verifyOtp } from "~/server/auth";

const OtpFormSchema = zod.object({
	otp: zod.string().min(6, {
		message: "OTP must be at least 6 characters.",
	}),
});

export function OtpForm() {
	const router = useRouter();

	const form = useForm<zod.infer<typeof OtpFormSchema>>({
		resolver: zodResolver(OtpFormSchema),
		defaultValues: {
			otp: "",
		},
	});

	async function onSubmit(data: zod.infer<typeof OtpFormSchema>) {
		const response = await verifyOtp({
			otpCode: data.otp,
			verificationType: OtpType.REGISTRATION,
		});

		if (response.meta.status >= 200 && response.meta.status < 300) {
			form.reset();
		}

		switch (response.meta.message) {
			case ResponseMessages.OTP_VERIFIED_SUCCESSFULLY:
				return router.push(routes.auth.createProfile);
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
					name="otp"
					render={({ field }) => (
						<FormItem>
							<FormLabel>OTP *</FormLabel>
							<FormControl>
								<Input placeholder="123456" {...field} />
							</FormControl>
							<FormMessage className="text-red-600" />
						</FormItem>
					)}
				/>
				<Button className={cn("mt-6 block w-full")} type="submit">
					Verify
				</Button>
			</form>
		</Form>
	);
}
