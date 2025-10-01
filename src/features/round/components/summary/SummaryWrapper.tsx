import React from "react";

interface SummaryWrapperProps extends React.PropsWithChildren {
	className?: string;
}

export const SummaryWrapper: React.FC<SummaryWrapperProps> = ({ className, children }) => {
	return <div className={`grid gapSm mb ${className}`}>{children}</div>;
};
