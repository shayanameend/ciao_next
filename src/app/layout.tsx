import type { ReactNode } from "react";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import "~/app/globals.css";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>
				<ThemeProvider enableSystem defaultTheme="dark" attribute="class">
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
