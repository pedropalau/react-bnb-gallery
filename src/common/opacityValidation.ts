const MIN = 0;

const MAX = 1;

export default function opacityValidation(
	props: Record<string, unknown>,
	propName: string,
): Error | null {
	const value = props[propName];

	if (typeof value !== 'number') {
		return null;
	}

	if (value < MIN || value > MAX) {
		return new Error('Invalid value for opacity');
	}

	return null;
}
