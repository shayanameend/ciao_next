import { persistentMap } from "@nanostores/persistent";
import { onMount } from "nanostores";

export const authStore = persistentMap<{
	token: string | undefined;
}>("$auth", {
	token: undefined,
});

onMount(authStore, () => {
	console.log("authStore mounted");
});

authStore.subscribe((value) => {
	console.log(value);
});
