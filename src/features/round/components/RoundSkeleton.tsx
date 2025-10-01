import { Goose } from "@/features/goose/components/Goose";

export const RoundSkeleton: React.FC = () => {
	return (
		<div>
			<div className="mb">
				<Goose />
			</div>

			<div className="grid gapSm mb">
				<div className="skeletonLine">-</div>
				<div className="skeletonLine">-</div>
				<div className="skeletonLine">-</div>
			</div>
		</div>
	);
};
