import * as zod from "zod";

export const envSchema = zod.object({
	NEXT_PUBLIC_API_URL: zod.string().url(),
});

export const env = envSchema.parse(process.env);
