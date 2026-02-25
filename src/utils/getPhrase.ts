export default function getPhrase<T = unknown>(
	phrase: string | ((args: T) => string) | unknown,
	args: T,
): string {
	if (typeof phrase === 'string') return phrase;

	if (typeof phrase === 'function') {
		return phrase(args);
	}

	return '';
}
