import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchApi } from "@/server/services/fetch";

import { Round } from "../../types";
import { roundsQueryKey } from "../queries/useRoundsQuery";

export const useRoundCreateMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newRound: Pick<Partial<Round>, "duration" | "cooldown">) => {
			return await fetchApi<Round>("/rounds", { method: "POST", body: JSON.stringify(newRound) });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: roundsQueryKey });
		}
	});
};
