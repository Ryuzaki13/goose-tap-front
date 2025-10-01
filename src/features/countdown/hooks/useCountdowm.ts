import { useEffect, useState } from "react";

export function useCountdown(targetDate: Date | string | number, onComplete?: () => void) {
	const target = typeof targetDate === "string" || typeof targetDate === "number" ? new Date(targetDate).getTime() : targetDate.getTime();

	const [remaining, setRemaining] = useState(() => Math.max(target - Date.now(), 0));

	useEffect(() => {
		if (remaining <= 0) return;

		const interval = setInterval(() => {
			const diff = target - Date.now();
			if (diff <= 0) {
				clearInterval(interval);
				setRemaining(0);
				if (onComplete) onComplete();
			} else {
				setRemaining(diff);
			}
		}, 1000);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target]);

	const seconds = Math.floor(remaining / 1000) % 60;
	const minutes = Math.floor(remaining / 1000 / 60) % 60;
	const hours = Math.floor(remaining / 1000 / 60 / 60);

	return { remaining, hours, minutes, seconds, isFinished: remaining <= 0 };
}
