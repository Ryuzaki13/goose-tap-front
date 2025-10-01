export type RoundStatus = "cooldown" | "active" | "finished";

export type UserWinner = {
	username: string;
	score: number;
};

export type Round = {
	id: string;
	startTime: Date;
	endTime: Date;
	status: RoundStatus;
	duration: number;
	cooldown: number;

	score?: number;
	total?: number;
	winner?: UserWinner;
};

export const ROUND_STATUS_MAP: Record<RoundStatus, string> = {
	cooldown: "Ожидание",
	active: "Активен",
	finished: "Завершен"
};
