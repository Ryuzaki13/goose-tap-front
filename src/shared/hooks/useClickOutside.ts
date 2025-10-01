import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement> | RefObject<HTMLElement>[], handler: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (Array.isArray(ref)) {
				let isOutside = true;
				for (const r of ref) {
					if (r.current && r.current.contains(event.target as Node)) {
						isOutside = false;
					}
				}
				if (isOutside) {
					handler();
				}
			} else if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [ref, handler]);
};

export { useClickOutside };
