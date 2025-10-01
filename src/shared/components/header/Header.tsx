import React from "react";

import { Link } from "@tanstack/react-router";

import { useAuthContext } from "@/features/login/context/AuthContext";

import { useHeaderStore } from "./useHeaderStore";

export const Header: React.FC = () => {
	const { user } = useAuthContext();
	const title = useHeaderStore((s) => s.title);

	return (
		<header>
			{title ? <Link to="/">К списку</Link> : <span></span>}
			<h1>{title || "Список раундов"}</h1>
			<Link to="/login">{user?.username}</Link>
		</header>
	);
};
