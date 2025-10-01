import { z } from "zod";

export const loginSchema = z.object({
	username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
	password: z.string().min(6, "Пароль должен содержать минимум 6 символов")
});

// export type LoginInput = z.infer<typeof loginSchema>;

export type User = {
	id?: number;
	username: string;
	role: string;
};
