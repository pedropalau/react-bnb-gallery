import type React from 'react';
import SidebarDocs from '@/components/sidebar-docs';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DocsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="container mx-auto max-w-5xl px-6 md:px-10">
			<SidebarProvider
				className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)] lg:gap-20"
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 58)',
					} as React.CSSProperties
				}
			>
				<SidebarDocs />
				<div className="h-full w-full">{children}</div>
			</SidebarProvider>
		</div>
	);
}
