import type { Metadata } from 'next';
import { Instrument_Sans as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';

import 'react-bnb-gallery/styles.css';
import './styles.css';
import { cn } from '@/lib/utils';

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
		<html
			className={cn(
				'bg-background text-foreground antialiased text-base font-sans',
				sans.variable,
			)}
			lang="en"
		>
			<body>{children}</body>
		</html>
	);
}
