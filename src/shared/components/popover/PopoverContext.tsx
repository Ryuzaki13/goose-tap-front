import React, { createContext, useContext } from "react";

import { Placement, useFloating } from "@floating-ui/react";

interface PopoverContextValue {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refs: ReturnType<typeof useFloating>["refs"];
	floatingStyles: React.CSSProperties;
	placement: Placement;
	middlewareData: ReturnType<typeof useFloating>["middlewareData"];
	arrowRef: React.RefObject<HTMLDivElement | null>;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopoverContext() {
	const context = useContext(PopoverContext);
	if (!context) throw new Error("Popover components must be used within <Popover>");
	return context;
}
