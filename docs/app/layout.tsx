import type { Metadata, Viewport } from 'next';
import { Geist, Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import 'react-bnb-gallery/styles.css';
import './styles.css';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: {
		default: 'bnbgallery',
		template: '%s - bnbgallery',
	},
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		],
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html className={cn('bg-white', inter.variable, geist.variable)} lang="en">
			<body className="flex min-h-screen flex-col">{children}</body>
		</html>
	);
}
