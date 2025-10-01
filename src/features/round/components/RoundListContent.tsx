import { useEffect, useRef } from "react";

import { Link } from "@tanstack/react-router";

import { Round, ROUND_STATUS_MAP } from "../types";

import styles from "./RoundListContent.module.scss";

interface RoundListContentProps {
	round: Round;
	refetch: () => void;
}

export const RoundListContent: React.FC<RoundListContentProps> = ({ round, refetch }) => {
	const startTime = new Date(round.startTime).toLocaleString();
	const endTime = new Date(round.endTime).toLocaleString();

	const hasTriggeredRef = useRef(false);

	// Делаем рефетч при наступлении времени старта и окончания раунда, чтобы точно синхронизироваться с сервером
	useEffect(() => {
		hasTriggeredRef.current = false;

		const start = new Date(round.startTime).getTime();
		const end = new Date(round.endTime).getTime();

		const interval = setInterval(() => {
			const now = Date.now();

			// Проверяем, не сработал ли уже refetch
			if (hasTriggeredRef.current) return;

			// Если сейчас после старта или после окончания
			if ((now >= start && now < start + 1000) || (now >= end && now < end + 1000)) {
				hasTriggeredRef.current = true;
				refetch();
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [round.startTime, round.endTime, refetch]);

	return (
		<li className={styles.content}>
			<div>
				<div className={styles.dotState} data-status={round.status} />
				Идентификатор раунда:{" "}
				<Link to={"/round/$roundId"} params={{ roundId: round.id }}>
					{round.id}
				</Link>
			</div>

			<div className={styles.grid}>
				<div>Начало:</div>
				<div>{startTime}</div>
				<div>Завершение:</div>
				<div>{endTime}</div>
			</div>

			<div className={styles.statusBar}>Статус: {ROUND_STATUS_MAP[round.status]}</div>
		</li>
	);
};
