import { createContext, useContext } from "react";

import { User } from "@/server/serverFns/auth/types";

interface AuthContextValue {
	user: User | null;
	isAdmin: boolean;
	login: (username: string, role: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = AuthContext.Provider;

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
