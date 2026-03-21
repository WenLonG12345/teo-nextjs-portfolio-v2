"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const isVisibleRef = useRef(false);

	useEffect(() => {
		const toggleVisibility = () => {
			const visible = window.scrollY > 300;
			if (visible !== isVisibleRef.current) {
				isVisibleRef.current = visible;
				setIsVisible(visible);
			}
		};

		window.addEventListener("scroll", toggleVisibility, { passive: true });
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!isVisible) return null;

	return (
		<Button
			onClick={scrollToTop}
			className="fixed bottom-6 right-6 z-50 rounded-full w-11 h-11 shadow-lg"
			size="icon"
			aria-label="Back to top"
		>
			<FaArrowUp size={16} />
		</Button>
	);
};

export default BackToTop;
