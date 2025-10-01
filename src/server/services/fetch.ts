import { env } from "@/env";

const isServer = typeof window === "undefined";
const base = isServer ? env.API_BASE_URL : env.VITE_API_BASE_URL;

export async function fetchApi<T>(input: string, init?: RequestInit): Promise<T> {
	const res = await fetch(base + input, {
		credentials: "include",
		headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
		...init
	});
	// Можно было бы завернуть авторизацию в jwt..., но пока не зачем.
	if (res.status === 401 && input !== "/auth/refresh") {
		throw new Error("Не авторизован");
		// const r = await fetch(base + "/auth/refresh", { method: "POST", credentials: "include" });
		// if (r.ok) {
		// 	const retry = await fetch(base + input, {
		// 		credentials: "include",
		// 		headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
		// 		...init
		// 	});
		// 	if (!retry.ok) throw new Error(await retry.text());
		// 	return retry.json();
		// }
	}
	if (!res.ok) throw new Error(await res.text());
	return res.json();
}
