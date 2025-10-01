import React from "react";

import { arrow, autoUpdate, flip, offset, Placement, shift, useFloating } from "@floating-ui/react";

import { PopoverContext } from "./PopoverContext";

interface PopoverProps {
	children: React.ReactNode;
	placement?: Placement;
}

export const Popover: React.FC<PopoverProps> = ({ children, placement = "bottom" }) => {
	const [open, setOpen] = React.useState(false);
	const arrowRef = React.useRef<HTMLDivElement | null>(null);

	const {
		refs,
		floatingStyles,
		middlewareData,
		placement: actualPlacement
	} = useFloating({
		open,
		onOpenChange: setOpen,
		placement,
		middleware: [offset(8), flip(), shift({ padding: 16 }), arrow({ element: arrowRef })],
		whileElementsMounted: autoUpdate
	});

	return (
		<PopoverContext.Provider value={{ open, setOpen, refs, floatingStyles, placement: actualPlacement, middlewareData, arrowRef }}>
			{children}
		</PopoverContext.Provider>
	);
};
