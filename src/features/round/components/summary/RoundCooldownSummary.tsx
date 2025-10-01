import { useQueryClient } from "@tanstack/react-query";

import { CountdownTimer } from "@/features/countdown/components/CountdownTimer";

import { roundsQueryKey } from "../../hooks/queries/useRoundsQuery";
import { Round } from "../../types";

import { SummaryWrapper } from "./SummaryWrapper";

interface SummaryProps {
	round: Round;
}

export const RoundCooldownSummary: React.FC<SummaryProps> = ({ round }) => {
	const queryClient = useQueryClient();

	return (
		<SummaryWrapper className="textCenter">
			<div>Cooldown</div>

			<CountdownTimer
				label="До начала раунда"
				targetDate={round.startTime}
				onComplete={() => queryClient.invalidateQueries({ queryKey: roundsQueryKey })}
			/>
		</SummaryWrapper>
	);
};
