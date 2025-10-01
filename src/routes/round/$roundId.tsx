import { createFileRoute } from "@tanstack/react-router";

import { RoundContent } from "@/features/round/components/RountContent";

export const Route = createFileRoute("/round/$roundId")({
	component: RouteComponent
});

function RouteComponent() {
	const { roundId } = Route.useParams();

	return <RoundContent roundId={roundId} />;
}
