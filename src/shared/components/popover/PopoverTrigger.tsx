import React from "react";

import { usePopoverContext } from "./PopoverContext";

export const PopoverTrigger: React.FC<{ children: React.ReactElement }> = ({ children }) => {
	const { setOpen, refs } = usePopoverContext();

	return React.cloneElement(children as React.JSX.Element, {
		ref: refs.setReference,
		onClick: (e: Event) => {
			e.preventDefault();
			e.stopPropagation();

			setOpen((v) => !v);
		}
	});
};
