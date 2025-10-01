import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		API_BASE_URL: z.string().url()
	},
	client: {
		VITE_API_BASE_URL: z.string().url()
	},
	clientPrefix: "VITE_",
	runtimeEnv: typeof window === "undefined" ? process.env : import.meta.env,
	emptyStringAsUndefined: true
});
