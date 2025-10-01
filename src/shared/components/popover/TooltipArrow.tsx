import React from "react";

import { MiddlewareData, Placement } from "@floating-ui/react-dom";

import { getArrowStyle } from "./getArrowStyle";

interface TooltipArrowProps {
	placement: Placement;
	middlewareData: MiddlewareData;
}

export const TooltipArrow = React.forwardRef<HTMLDivElement, TooltipArrowProps>(({ placement, middlewareData }, ref) => {
	return (
		<div ref={ref} style={getArrowStyle(placement, middlewareData)}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="var(--color-border)"
				stroke="var(--color-border)"
				strokeWidth="var(--border-width)"
				style={{ display: "block" }}>
				<polygon points="8,8 16,16 0,16" />
			</svg>
		</div>
	);
});
