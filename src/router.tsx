import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

export interface RouterContext {
	queryClient: QueryClient;
	title?: string;
}

// Create a new router instance
export const getRouter = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5
			}
		}
	});

	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		Wrap: ({ children }: { children: React.ReactNode }) => {
			return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
		}
	});

	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
