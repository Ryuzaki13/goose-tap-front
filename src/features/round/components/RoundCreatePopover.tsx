import { useState } from "react";

import { useAuthContext } from "@/features/login/context/AuthContext";
import { Popover } from "@/shared/components/popover/Popover";
import { PopoverContent } from "@/shared/components/popover/PopoverContent";
import { PopoverTrigger } from "@/shared/components/popover/PopoverTrigger";

import { useRoundCreateMutation } from "../hooks/mutations/useRoundCreateMutation";
import { Round } from "../types";

import styles from "./RoundCreatePopover.module.scss";

export const RoundCreatePopover: React.FC = () => {
	// TODO: тут тоже можно было бы достать из .env параметры по умолчанию
	// Или лучший вариант, получить их с сервера при загрузке страницы
	// Для теста пока захардкодил
	const [round, setRound] = useState<Pick<Round, "duration" | "cooldown">>({ duration: 60, cooldown: 30 });

	const { isAdmin } = useAuthContext();
	const createMutation = useRoundCreateMutation();

	const handleCreateRound = () => {
		createMutation.mutate({ ...round });
	};

	return (
		isAdmin && (
			<Popover>
				<PopoverTrigger>
					<button onClick={handleCreateRound}>Создать раунд</button>
				</PopoverTrigger>

				<PopoverContent>
					{({ setClose }) => (
						<div className={styles.form}>
							<div className="field">
								<label htmlFor="inputDuration">Длительность (сек):</label>
								<input
									id="inputDuration"
									type="number"
									min={30}
									max={3600}
									value={round.duration}
									onChange={(e) => setRound((prev) => ({ ...prev, duration: e.target.valueAsNumber }))}
								/>
							</div>

							<div className="field">
								<label htmlFor="inputCooldown">Начало через (сек):</label>
								<input
									id="inputCooldown"
									type="number"
									min={30}
									max={3600}
									value={round.cooldown}
									onChange={(e) => setRound((prev) => ({ ...prev, cooldown: e.target.valueAsNumber }))}
								/>
							</div>

							<button
								onClick={() => {
									handleCreateRound();
									setClose();
								}}>
								Создать
							</button>
						</div>
					)}
				</PopoverContent>
			</Popover>
		)
	);
};
