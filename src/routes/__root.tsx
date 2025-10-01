import { HeadContent, Scripts, createRootRouteWithContext, redirect } from "@tanstack/react-router";

import { AuthProvider } from "@/features/login/context/AuthProvider";
import type { RouterContext } from "@/router";
import { getMe } from "@/server/serverFns/auth/getMe";
import { Header } from "@/shared/components/header/Header";
import appCss from "@/shared/styles/styles.scss?url";

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ httpEquiv: "Content-Language", content: "ru" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Duck Tap" }
		],
		links: [{ rel: "stylesheet", href: appCss }]
	}),
	beforeLoad: async ({ location }) => {
		if (location.pathname.includes("/login")) {
			return {};
		}

		const user = await getMe();
		if (!user) {
			throw redirect({ to: "/login" });
		}

		return { user };
	},
	ssr: true,
	shellComponent: RootDocument,
	notFoundComponent: () => <div>Тут будет 404 Not Found</div>,
	errorComponent: () => <div>Тут будет Error boundary</div>
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { user } = Route.useRouteContext();

	return (
		<html lang="ru">
			<head>
				<HeadContent />
			</head>
			<body>
				<AuthProvider initialUser={user ?? null}>
					<Header />
					<main>{children}</main>
				</AuthProvider>
				<Scripts />
			</body>
		</html>
	);
}
