import { useCallback, useEffect, useMemo, useState } from "react";

import { User } from "@/server/serverFns/auth/types";

import { AuthContextProvider } from "./AuthContext";

interface AuthProviderProps extends React.PropsWithChildren {
	initialUser: User | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ initialUser, children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (initialUser) {
			setUser({ ...initialUser });
			setIsAdmin(initialUser.role === "admin");
		}
	}, [initialUser]);

	const login = useCallback((username: string, role: string) => {
		setUser({ username, role });
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	const value = useMemo(() => {
		return { user, isAdmin, login, logout };
	}, [isAdmin, login, logout, user]);

	return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};
