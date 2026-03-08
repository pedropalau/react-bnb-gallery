import { useEffect, useState } from 'react';

function getPrefersReducedMotion(): boolean {
	if (
		typeof window === 'undefined' ||
		typeof window.matchMedia !== 'function'
	) {
		return false;
	}

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Tracks whether the user prefers reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(
		getPrefersReducedMotion,
	);

	useEffect(() => {
		if (
			typeof window === 'undefined' ||
			typeof window.matchMedia !== 'function'
		) {
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const onChange = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);
		};

		setPrefersReducedMotion(mediaQuery.matches);
		mediaQuery.addEventListener('change', onChange);

		return () => {
			mediaQuery.removeEventListener('change', onChange);
		};
	}, []);

	return prefersReducedMotion;
}
