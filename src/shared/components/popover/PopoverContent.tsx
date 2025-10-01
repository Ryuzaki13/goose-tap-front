import React from "react";

import { FloatingPortal } from "@floating-ui/react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";

import styles from "./Popover.module.scss";
import { usePopoverContext } from "./PopoverContext";
import { TooltipArrow } from "./TooltipArrow";

export const PopoverContent: React.FC<{ children: (ctx: { setClose: () => void }) => React.ReactNode }> = ({ children }) => {
	const { open, setOpen, refs, floatingStyles, middlewareData, placement, arrowRef } = usePopoverContext();

	const setClose = React.useCallback(() => setOpen(false), [setOpen]);

	useClickOutside([refs.floating as React.RefObject<HTMLElement>, refs.reference as React.RefObject<HTMLElement>], setClose);

	if (!open) return null;

	return (
		<FloatingPortal>
			<div ref={refs.setFloating} style={floatingStyles} className={styles.popover} role="dialog" aria-modal="true">
				{children({ setClose })}
				<TooltipArrow ref={arrowRef} placement={placement} middlewareData={middlewareData} />
			</div>
		</FloatingPortal>
	);
};
