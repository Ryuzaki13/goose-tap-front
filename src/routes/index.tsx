import { createFileRoute } from "@tanstack/react-router";

import { RoundListContainer } from "@/features/round/components/RoundListContainer";

export const Route = createFileRoute("/")({
	component: App
});

function App() {
	return <RoundListContainer />;
}
