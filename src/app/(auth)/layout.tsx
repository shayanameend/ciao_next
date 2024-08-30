"use client";

import { useStore } from "@nanostores/react";
import { useEffect, type PropsWithChildren } from "react";
import { WavyBackground } from "~/components/ui/wavy-background";
import { primaryFont } from "~/lib/fonts";
import { socketStore } from "~/stores/socket";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
	const { instance } = useStore(socketStore);

	useEffect(() => {
		if (instance) {
			instance.disconnect();
		}

		return () => {
			if (instance) {
				instance.connect();
			}
		};
	}, [instance]);

	return (
		<WavyBackground
			backgroundFill="transparent"
			colors={["#0ea5e9", "#e2e8f0", "#ef4444"]}
		>
			<main className="h-screen flex flex-col gap-8 justify-center items-center">
				<section className="flex flex-col">
					<h2
						className="text-5xl font-bold text-primary"
						style={primaryFont.style}
					>
						Ciao.
					</h2>
					<p className="max-w-xs text-lg opacity-95">
						Send messages to your friends and family for free!
					</p>
				</section>
				<section className="max-w-xs w-full">
					<article>{children}</article>
				</section>
			</main>
		</WavyBackground>
	);
}
