import styles from "./Goose.module.scss";

interface GooseProps {
	isActive?: boolean;
	onTap?: () => void;
}

export const Goose: React.FC<GooseProps> = ({ isActive, onTap }) => {
	return (
		<div onPointerDown={onTap} className={styles.goose}>
			<img src="/goose.png" className={isActive ? "" : styles.inactive} />
		</div>
	);
};
