import type { ReactNode } from 'react';

/**
 * Returns a plain-text fallback from caption-like content when possible.
 * Non-text nodes return an empty string.
 */
export function getCaptionText(caption: ReactNode): string {
	if (typeof caption === 'string' || typeof caption === 'number') {
		return String(caption);
	}

	return '';
}

/**
 * @deprecated Use named import instead:
 * `import { getCaptionText } from './get-caption-text'`.
 * Default export will be removed in the next major version.
 */
export default getCaptionText;
