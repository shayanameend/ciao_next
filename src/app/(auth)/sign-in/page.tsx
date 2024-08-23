import { SignInForm } from "~/components/forms/sign-in-form";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { FaGithub, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {
	return (
		<Card className="mx-auto bg-background/65">
			<CardHeader>
				<CardTitle className="max-w-xs text-3xl">
					Login to your account
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SignInForm />
				<Separator className={cn("my-4")} />
				<section className="flex flex-row gap-4">
					<Button className="flex-1" variant="outline">
						<FaGithub className="mr-1" size={14} />
						Github
					</Button>
					<Button className="flex-1" variant="outline">
						<FaFacebook className="mr-1" size={14} />
						Facebook
					</Button>
				</section>
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<p className="text-xs">
					Don't have an account?{" "}
					<Link className="text-primary" href="/sign-up">
						Sign Up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
