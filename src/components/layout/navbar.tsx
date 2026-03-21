"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { NAV_ITEM_LIST } from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import ToggleLanguage from "./toggle-language";
import { ToggleTheme } from "./toogle-theme";

export const Navbar = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const t = useTranslations();
	const pathname = usePathname();
	const menuRef = useRef<HTMLElement>(null);

	// Close on route change
	useEffect(() => {
		if (pathname) {
			setIsOpen(false);
		}
	}, [pathname]);

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	return (
		<header
			ref={menuRef}
			className="sticky top-4 z-40 w-[92%] md:w-[80%] lg:w-[75%] lg:max-w-screen-xl mx-auto overflow-hidden rounded-2xl border border-border/60 bg-background/80 backdrop-blur-md shadow-sm"
		>
			{/* ── Main bar ── */}
			<div className="flex items-center justify-between px-4 py-2.5">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2.5 shrink-0">
					<Image src="/logo.png" width={38} height={38} alt="Teo logo" />
				</Link>

				{/* Desktop nav links */}
				<nav
					className="hidden lg:flex items-center gap-0.5"
					aria-label="Main navigation"
				>
					{NAV_ITEM_LIST.map(({ href, label }) => {
						const active = pathname === href;
						return (
							<Link
								key={href}
								href={href}
								className={cn(
									"relative px-4 py-2 font-medium rounded-lg transition-colors duration-200",
									active
										? "text-primary"
										: "text-foreground/60 hover:text-foreground hover:bg-muted/60",
								)}
							>
								{t(label)}
								{active && (
									<span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary" />
								)}
							</Link>
						);
					})}
				</nav>

				{/* Right controls */}
				<div className="flex items-center gap-0.5">
					<ToggleTheme />
					<ToggleLanguage />

					{/* Mobile hamburger / close */}
					<Button
						variant="ghost"
						size="icon"
						className="ml-1 lg:hidden h-9 w-9"
						onClick={() => setIsOpen((prev) => !prev)}
						aria-label={isOpen ? "Close menu" : "Open menu"}
						aria-expanded={isOpen}
					>
						{isOpen ? <LuX size={18} /> : <LuMenu size={18} />}
					</Button>
				</div>
			</div>

			{/* ── Mobile dropdown ── */}
			{isOpen && (
				<nav
					className="border-t lg:hidden border-border/60 bg-background/95"
					aria-label="Mobile navigation"
				>
					<ul className="flex flex-col gap-1 p-3">
						{NAV_ITEM_LIST.map(({ href, label }) => {
							const active = pathname === href;
							return (
								<li key={href}>
									<Link
										href={href}
										onClick={() => setIsOpen(false)}
										className={cn(
											"flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200",
											active
												? "text-primary bg-primary/8"
												: "text-foreground/70 hover:text-foreground hover:bg-muted/60",
										)}
									>
										<span
											className={cn(
												"w-1.5 h-1.5 rounded-full shrink-0 transition-colors",
												active ? "bg-primary" : "bg-border",
											)}
										/>
										{t(label)}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			)}
		</header>
	);
};
