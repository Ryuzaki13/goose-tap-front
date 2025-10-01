import { useCallback, useEffect } from "react";

import { Goose } from "@/features/goose/components/Goose";
import { useAuthContext } from "@/features/login/context/AuthContext";
import { fetchApi } from "@/server/services/fetch";
import { useHeaderStore } from "@/shared/components/header/useHeaderStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

import { useRoundQuery } from "../hooks/queries/useRoundQuery";
import { useRoundScoreStore } from "../store/useScoreStore";
import { ROUND_STATUS_MAP } from "../types";

import { RoundSkeleton } from "./RoundSkeleton";
import { RoundActiveSummary } from "./summary/RoundActiveSummary";
import { RoundCooldownSummary } from "./summary/RoundCooldownSummary";
import { RoundFinishedSummary } from "./summary/RoundFinishedSummary";

interface RoundContentProps {
	roundId: string;
}

export const RoundContent: React.FC<RoundContentProps> = ({ roundId }) => {
	const { data, isLoading } = useRoundQuery({ roundId });
	const { isAdmin } = useAuthContext();
	const setScore = useRoundScoreStore((s) => s.setScore);
	const setTitle = useHeaderStore((s) => s.setTitle);
	// admin не должен тапать?
	const isActive = !isAdmin && data?.status === "active";

	useEffect(() => {
		setScore(data?.score ?? 0);

		if (data) {
			setTitle(ROUND_STATUS_MAP[data.status]);
		}

		return () => setTitle("");
	}, [data, setScore, setTitle]);

	const handleTap = useCallback(async () => {
		if (!isActive) return;

		try {
			const response = await fetchApi<{ score: number }>("/rounds/tap", { method: "POST", body: JSON.stringify({ roundId }) });
			setScore(response.score);
		} catch (e) {
			const errorMessage = getErrorMessage(e);

			// TODO: тут мог быть какой-нибудь центр уведомлений
			console.log(errorMessage);
		}
	}, [roundId, setScore, isActive]);

	if (isLoading) return <RoundSkeleton />;

	const renderSummary = () => {
		switch (data?.status) {
			case "cooldown":
				return <RoundCooldownSummary round={data} />;
			case "active":
				return <RoundActiveSummary round={data} />;
			case "finished":
				return <RoundFinishedSummary round={data} />;
		}
		return null;
	};

	return (
		<div>
			<div className="mb">
				<Goose onTap={handleTap} isActive={isActive} />
			</div>

			{renderSummary()}
		</div>
	);
};
