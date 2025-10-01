import React from "react";

import { useRoundsQuery } from "../hooks/queries/useRoundsQuery";

import { RoundCreatePopover } from "./RoundCreatePopover";
import { RoundListContent } from "./RoundListContent";

export const RoundListContainer: React.FC = () => {
	// TODO: тут можно было бы использовать useInfiniteQuery для пагинации или ленивой подгрузки
	const { data: rounds, isLoading, refetch } = useRoundsQuery();

	if (isLoading) {
		// TODO: сделать нормальный скилетон
		return <div className="skeletonLine">Загрузка...</div>;
	}

	const needRefetch = () => {
		refetch();
	};

	return (
		<>
			<RoundCreatePopover />

			<ul className="">
				{rounds?.map((round) => (
					<RoundListContent key={round.id} round={round} refetch={needRefetch} />
				))}
			</ul>
		</>
	);
};
