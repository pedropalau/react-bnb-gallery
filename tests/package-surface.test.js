import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import * as entrypoint from '../src/index';

describe('package surface', () => {
	it('exposes named exports only at the root entrypoint', () => {
		expect(entrypoint).toHaveProperty('ReactBnbGallery');
		expect(entrypoint).toHaveProperty('Gallery');
		expect(entrypoint).not.toHaveProperty('default');
	});

	it('keeps explicit JS and CSS package export mappings', () => {
		const packageJsonPath = resolve(process.cwd(), 'package.json');
		const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

		expect(packageJson.exports['.']).toEqual(
			expect.objectContaining({
				types: './dist/types/index.d.ts',
				require: './dist/index.js',
				import: './dist/index.es.js',
			}),
		);
		expect(packageJson.exports['./dist/style.css']).toBe('./dist/style.css');
		expect(packageJson.exports['./styles.css']).toBe('./styles.css');
	});
});
