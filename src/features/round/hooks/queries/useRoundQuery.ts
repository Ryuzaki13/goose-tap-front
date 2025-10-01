import { queryOptions, useQuery } from "@tanstack/react-query";

import { fetchApi } from "@/server/services/fetch";

import { Round } from "../../types";

import { roundsQueryKey } from "./useRoundsQuery";

interface RoundQueryParams {
	roundId: string;
}

export const roundQueryOptions = ({ roundId }: RoundQueryParams) =>
	queryOptions({
		queryKey: [...roundsQueryKey, roundId],
		queryFn: async () => await fetchApi<Round>(`/rounds/${roundId}`, { method: "GET" }),
		throwOnError: true
	});

export const useRoundQuery = (params: RoundQueryParams) => {
	return useQuery({ ...roundQueryOptions(params) });
};
