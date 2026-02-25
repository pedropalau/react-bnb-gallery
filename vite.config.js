import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const pkg = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);
const external = [
	...Object.keys(pkg.peerDependencies || {}),
	...Object.keys(pkg.dependencies || {}),
];

export default defineConfig({
	esbuild: {
		loader: 'tsx',
		include: /(src|tests)\/.*\.[jt]sx?$/,
		exclude: [],
	},
	plugins: [
		react({
			include: /\.[jt]sx?$/,
		}),
	],
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'ReactBnbGallery',
			formats: ['es', 'cjs'],
			fileName: (format) => (format === 'es' ? 'index.es.js' : 'index.js'),
			cssFileName: 'style',
		},
		rollupOptions: {
			external,
			output: {
				exports: 'named',
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./tests/setup.js'],
		include: ['tests/**/*.test.js'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'json-summary'],
			include: ['src/**/*.{js,jsx,mjs}'],
			thresholds: {
				lines: 80,
				statements: 80,
			},
		},
	},
});
