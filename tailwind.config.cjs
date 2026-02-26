/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx,css}'],
	theme: {
		extend: {
			colors: {
				'rbg-background': 'var(--rbg-background)',
				'rbg-foreground': 'var(--rbg-foreground)',
				'rbg-foreground-subtle': 'var(--rbg-foreground-subtle)',
				'rbg-foreground-muted': 'var(--rbg-foreground-muted)',
				'rbg-overlay': 'var(--rbg-overlay)',
				'rbg-fg': 'var(--rbg-color-fg)',
				'rbg-fg-subtle': 'var(--rbg-color-fg-subtle)',
				'rbg-fg-muted': 'var(--rbg-color-fg-muted)',
			},
			borderRadius: {
				rbgSm: 'var(--rbg-radius-sm)',
				rbgMd: 'var(--rbg-radius-md)',
				rbgLg: 'var(--rbg-radius-lg)',
			},
		},
	},
	plugins: [],
};
