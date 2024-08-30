import type { PropsWithChildren } from "react";
import { Transition } from "~/components/common/transition";

export default function Template({ children }: Readonly<PropsWithChildren>) {
	return <Transition>{children}</Transition>;
}
