import { Round } from "../../types";

import styles from "./Summary.module.scss";
import { SummaryWrapper } from "./SummaryWrapper";

interface SummaryProps {
	round: Round;
}

export const RoundFinishedSummary: React.FC<SummaryProps> = ({ round }) => {
	if (!round.winner) {
		return <div className="textCenter">Раудн завершился без единого участника</div>;
	}

	return (
		<SummaryWrapper>
			<div className={styles.row}>
				<div>Всего</div>
				<div>{round.total ?? 0}</div>
			</div>
			<div className={styles.row}>
				<div>Победитель - {round.winner.username}</div>
				<div>{round.winner.score}</div>
			</div>
			<div className={styles.row}>
				<div>Мои очки</div>
				<div>{round.score ?? 0}</div>
			</div>
		</SummaryWrapper>
	);
};
