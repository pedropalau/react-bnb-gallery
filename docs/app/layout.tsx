import type { Metadata } from 'next';
import { Geist_Mono as FontMono, Geist as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';

import './styles.css';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = FontMono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: {
		default: 'bnbgallery',
		template: '%s - bnbgallery',
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(fontSans.variable, fontMono.variable)}
		>
			<body className="bg-background text-foreground antialiased text-base font-sans overscroll-none">
				{children}
			</body>
		</html>
	);
}
