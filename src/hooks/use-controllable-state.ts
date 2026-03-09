import type { SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface UseControllableStateOptions<T> {
	value?: T;
	defaultValue: T | (() => T);
	onChange?: (value: T) => void;
}

function resolveStateAction<T>(value: SetStateAction<T>, previousValue: T): T {
	return typeof value === 'function'
		? (value as (previousValue: T) => T)(previousValue)
		: value;
}

export function useControllableState<T>({
	value,
	defaultValue,
	onChange,
}: UseControllableStateOptions<T>) {
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : uncontrolledValue;

	useEffect(() => {
		if (isControlled) {
			setUncontrolledValue(value);
		}
	}, [isControlled, value]);

	const setValue = useCallback(
		(nextValue: SetStateAction<T>) => {
			if (isControlled) {
				const resolvedValue = resolveStateAction(nextValue, currentValue);
				if (!Object.is(resolvedValue, currentValue)) {
					onChange?.(resolvedValue);
				}
				return;
			}

			setUncontrolledValue((previousValue) => {
				const resolvedValue = resolveStateAction(nextValue, previousValue);
				if (!Object.is(resolvedValue, previousValue)) {
					onChange?.(resolvedValue);
				}
				return resolvedValue;
			});
		},
		[currentValue, isControlled, onChange],
	);

	return [currentValue, setValue] as const;
}
