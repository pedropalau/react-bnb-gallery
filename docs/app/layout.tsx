import type { Metadata } from 'next';
import { Geist as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import './styles.css';

const sans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
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
		<html lang="en" suppressHydrationWarning className={sans.variable}>
			<body className="bg-background text-foreground antialiased text-base font-sans overscroll-none">
				{children}
			</body>
		</html>
	);
}
