import { Transition } from "~/components/common/transition";

export default function Template({ children }: { children: React.ReactNode }) {
	return <Transition>{children}</Transition>;
}
