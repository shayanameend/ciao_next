import { default as Link } from "next/link";
import { ProfileForm } from "~/components/forms/profile-form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export default function ProfilePage() {
	return (
		<Card className="mx-auto bg-background/65">
			<CardHeader>
				<CardTitle className="text-center text-3xl">
					Create your profile
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ProfileForm />
			</CardContent>
			<CardFooter className="flex flex-col items-center">
				<p className="text-xs">
					Already have an account?{" "}
					<Link className="text-primary" href="/sign-in">
						Sign In
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
