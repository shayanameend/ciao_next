"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Transition({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
