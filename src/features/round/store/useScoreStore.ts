import { create } from "zustand/react";

export type RoundScoreStore = {
	score: number;
	setScore: (value: number) => void;
};

export const useRoundScoreStore = create<RoundScoreStore>((set) => ({
	score: 0,
	setScore: (score) => set({ score })
}));
