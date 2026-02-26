/**
 * Resolves a phrase to a string, supporting both static strings and dynamic
 * factory functions.
 *
 * @template T - The type of arguments passed to the phrase factory function.
 * @param phrase - A static string, a function that returns a string given `args`, or an unknown value.
 * @param args - Arguments forwarded to `phrase` when it is a function.
 * @returns The resolved string, or an empty string if `phrase` is neither a string nor a function.
 */
export function resolvePhrase<T = unknown>(
	phrase: string | ((args: T) => string) | unknown,
	args: T,
): string {
	if (typeof phrase === 'string') return phrase;

	if (typeof phrase === 'function') {
		return phrase(args);
	}

	return '';
}
