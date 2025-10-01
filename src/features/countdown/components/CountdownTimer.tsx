import React from "react";

import { useCountdown } from "../hooks/useCountdowm";

interface CountdownTimerProps {
	targetDate: Date | string | number;
	onComplete?: () => void;
	label?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete, label }) => {
	const { minutes, seconds, isFinished } = useCountdown(targetDate, onComplete);

	if (isFinished) {
		return <div>Время вышло</div>;
	}

	return (
		<div>
			{label && <span>{label}: </span>}
			<code>
				{`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
			</code>
		</div>
	);
};
