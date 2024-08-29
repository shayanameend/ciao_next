import { Transition } from "~/components/common/transition";
import type { PropsWithChildren } from "react";

export default function Template({ children }: Readonly<PropsWithChildren>) {
	return <Transition>{children}</Transition>;
}
