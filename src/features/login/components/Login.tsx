import React, { useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import { loginSchema, User } from "@/server/serverFns/auth/types";
import { fetchApi } from "@/server/services/fetch";

import styles from "./Login.module.scss";

export const Login: React.FC = () => {
	const [form, setForm] = useState({ username: "", password: "" });
	const [errors, setErrors] = useState<{ username?: string; password?: string; common?: string }>({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: undefined, common: undefined });
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrors({});

		// Валидация через zod
		const result = loginSchema.safeParse(form);
		if (!result.success) {
			const fieldErrors: { username?: string; password?: string } = {};
			result.error.errors.forEach((err) => {
				if (err.path[0] === "username") fieldErrors.username = err.message;
				if (err.path[0] === "password") fieldErrors.password = err.message;
			});
			setErrors(fieldErrors);
			return;
		}
		setLoading(true);
		try {
			await fetchApi<User>("/auth/login", {
				method: "POST",
				body: JSON.stringify(form)
			});

			navigate({ to: "/" });
		} catch (e) {
			setErrors({ common: (e as Error).message || "Ошибка входа" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h1>Войти</h1>

			<div className="field">
				<label htmlFor="username">Имя пользователя:</label>
				<input
					type="text"
					id="username"
					name="username"
					value={form.username}
					onChange={handleChange}
					required
					disabled={loading}
				/>
			</div>
			<div className="field">
				<label htmlFor="password">Пароль:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					required
					disabled={loading}
				/>
			</div>
			<div className="field">
				<button type="submit" disabled={loading}>
					{loading ? "Входим..." : "Войти"}
				</button>
			</div>

			<ul className={styles.errorList}>
				{errors.username && <li>{errors.username}</li>}
				{errors.password && <li>{errors.password}</li>}
				{errors.common && <li>{errors.common}</li>}
			</ul>
		</form>
	);
};
