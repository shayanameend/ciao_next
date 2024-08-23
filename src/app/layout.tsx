import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/toaster";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
