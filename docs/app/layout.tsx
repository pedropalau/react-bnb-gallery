import type { Metadata } from 'next';
import { Instrument_Sans as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import './styles.css';

const sans = FontSans({
	subsets: ['latin'],
	variable: '--font-ans',
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
		<html lang="en">
			<body
				className={cn(
					'bg-background text-foreground antialiased text-base font-sans overscroll-none',
					sans.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
