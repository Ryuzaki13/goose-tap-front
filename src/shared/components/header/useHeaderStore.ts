import { create } from "zustand/react";

export interface HeaderStore {
	title: string;
	setTitle: (value: string) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
	title: "",
	setTitle: (title) => set({ title })
}));
