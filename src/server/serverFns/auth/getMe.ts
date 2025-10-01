import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseStatus } from "@tanstack/react-start/server";

import { fetchApi } from "@/server/services/fetch";

import { User } from "./types";

export const getMe = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const request = getRequest();
		const response = await fetchApi<User>("/auth/me", {
			method: "GET",
			headers: { cookie: request.headers.get("cookie") || "" }
		});

		return { ...response };
	} catch (error) {
		console.error("Ошибка проверки авторизации:", error);
		setResponseStatus(401);
		return null;
	}
});
