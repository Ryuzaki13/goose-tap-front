import { useQueryClient } from "@tanstack/react-query";

import { CountdownTimer } from "@/features/countdown/components/CountdownTimer";

import { roundsQueryKey } from "../../hooks/queries/useRoundsQuery";
import { useRoundScoreStore } from "../../store/useScoreStore";
import { Round } from "../../types";

import { SummaryWrapper } from "./SummaryWrapper";

interface SummaryProps {
	round: Round;
}

export const RoundActiveSummary: React.FC<SummaryProps> = ({ round }) => {
	const queryClient = useQueryClient();

	return (
		<SummaryWrapper className="textCenter">
			<div>Раунд активен!</div>

			<CountdownTimer
				label="До конца раунда"
				targetDate={round.endTime}
				onComplete={() => queryClient.invalidateQueries({ queryKey: roundsQueryKey })}
			/>

			<MyScore />
		</SummaryWrapper>
	);
};

const MyScore = () => {
	const score = useRoundScoreStore((s) => s.score);
	return <div>Мои очки {score ?? 0}</div>;
};
