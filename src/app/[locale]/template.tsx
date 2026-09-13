// Remounts on every navigation, so the float-up replays per page.
// Pure CSS: no hydration flash, honours prefers-reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:ease-out">
			{children}
		</div>
	);
}
