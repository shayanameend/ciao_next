import Link from "next/link";
import { OtpForm } from "~/components/forms/otp-form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export default function VerificationPage() {
	return (
		<Card className="mx-auto bg-background/65">
			<CardHeader>
				<CardTitle className="text-center text-3xl">
					Verify your account
				</CardTitle>
			</CardHeader>
			<CardContent>
				<OtpForm />
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<p className="text-xs">
					Didn't receive the OTP?{" "}
					<Link className="text-primary" href="/sign-in">
						Resend OTP
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
