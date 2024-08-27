import { map } from "nanostores";

export const authStore = map<{
	token: string | null;
}>({
	token: null,
});
