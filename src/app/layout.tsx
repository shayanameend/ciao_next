import type { PropsWithChildren } from "react";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import "~/app/globals.css";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>
				<ThemeProvider enableSystem defaultTheme="system" attribute="class">
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
