import type React from 'react';
import { CopyButton } from './copy-button';

export function CodeBlock({
	__raw__,
	children,
}: {
	__raw__: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-muted text-foreground rounded-lg mt-4 lg:mt-6 overflow-hidden text-sm relative">
			<CopyButton value={__raw__} />
			<div className="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0">
				{children}
			</div>
		</div>
	);
}
