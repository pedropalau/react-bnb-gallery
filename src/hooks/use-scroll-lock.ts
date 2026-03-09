import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

interface UseScrollLockOptions {
	autoLock?: boolean;
	lockTarget?: HTMLElement | string;
	widthReflow?: boolean;
}

interface UseScrollLockReturn {
	isLocked: boolean;
	lock: () => void;
	unlock: () => void;
}

interface ScrollLockSnapshot {
	overflow: string;
	paddingRight: string;
}

const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const targetLockCounts = new WeakMap<HTMLElement, number>();
const targetSnapshots = new WeakMap<HTMLElement, ScrollLockSnapshot>();

function resolveTarget(lockTarget?: HTMLElement | string): HTMLElement | null {
	if (typeof document === 'undefined') {
		return null;
	}

	if (!lockTarget) {
		return document.body;
	}

	if (typeof lockTarget === 'string') {
		return document.querySelector(lockTarget);
	}

	return lockTarget;
}

function getScrollbarWidth(target: HTMLElement): number {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return 0;
	}

	if (target === document.body) {
		return Math.max(
			0,
			window.innerWidth - document.documentElement.clientWidth,
		);
	}

	const style = window.getComputedStyle(target);
	const borderWidth =
		Number.parseFloat(style.borderLeftWidth) +
		Number.parseFloat(style.borderRightWidth);
	return Math.max(0, target.offsetWidth - target.clientWidth - borderWidth);
}

export function useScrollLock(
	options: UseScrollLockOptions = {},
): UseScrollLockReturn {
	const { autoLock = true, lockTarget, widthReflow = true } = options;
	const [isLocked, setIsLocked] = useState(false);
	const targetRef = useRef<HTMLElement | null>(null);

	const lock = useCallback(() => {
		const target = targetRef.current;
		if (!target) {
			return;
		}

		const currentCount = targetLockCounts.get(target) ?? 0;
		if (currentCount === 0) {
			targetSnapshots.set(target, {
				overflow: target.style.overflow,
				paddingRight: target.style.paddingRight,
			});

			if (widthReflow) {
				const scrollbarWidth = getScrollbarWidth(target);
				if (scrollbarWidth > 0) {
					const computedPaddingRight =
						Number.parseFloat(window.getComputedStyle(target).paddingRight) ||
						0;
					target.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
				}
			}

			target.style.overflow = 'hidden';
		}

		targetLockCounts.set(target, currentCount + 1);
		setIsLocked(true);
	}, [widthReflow]);

	const unlock = useCallback(() => {
		const target = targetRef.current;
		if (!target) {
			return;
		}

		const currentCount = targetLockCounts.get(target) ?? 0;
		if (currentCount <= 0) {
			setIsLocked(false);
			return;
		}

		const nextCount = currentCount - 1;
		if (nextCount === 0) {
			targetLockCounts.delete(target);
			const snapshot = targetSnapshots.get(target);
			if (snapshot) {
				target.style.overflow = snapshot.overflow;
				target.style.paddingRight = snapshot.paddingRight;
				targetSnapshots.delete(target);
			}
		} else {
			targetLockCounts.set(target, nextCount);
		}

		setIsLocked(false);
	}, []);

	useIsomorphicLayoutEffect(() => {
		targetRef.current = resolveTarget(lockTarget);
		if (!targetRef.current) {
			return;
		}

		if (autoLock) {
			lock();
		}

		return () => {
			if (autoLock) {
				unlock();
			}
		};
	}, [autoLock, lock, lockTarget, unlock]);

	return { isLocked, lock, unlock };
}
