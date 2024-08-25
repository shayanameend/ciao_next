import { persistentMap } from "@nanostores/persistent";

export const authStore = persistentMap<{
	token: string | undefined;
}>("auth", undefined);
