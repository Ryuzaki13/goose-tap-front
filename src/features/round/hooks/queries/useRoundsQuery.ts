import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";

import { fetchApi } from "@/server/services/fetch";

import { Round } from "../../types";

export const roundsQueryKey = ["rounds"] as const;
export const roundsQueryOptions = () =>
	queryOptions({
		queryKey: roundsQueryKey,
		queryFn: async () => await fetchApi<Round[]>("/rounds", { method: "GET" }),
		throwOnError: true
	});

export const useRoundsQuery = () => {
	return useQuery({ ...roundsQueryOptions(), placeholderData: keepPreviousData });
};
