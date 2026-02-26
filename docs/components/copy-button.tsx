'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function copyToClipboardWithMeta(value: string) {
	navigator.clipboard.writeText(value);
}

export function CopyButton({
	value,
	className,
	variant = 'ghost',
	...props
}: React.ComponentProps<typeof Button> & {
	value: string;
	src?: string;
	tooltip?: string;
}) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		if (hasCopied) {
			const timer = setTimeout(() => setHasCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [hasCopied]);

	return (
		<Button
			data-slot="copy-button"
			data-copied={hasCopied}
			size="icon"
			variant={variant}
			className={cn(
				'absolute top-2 right-2.5 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100',
				className,
			)}
			onClick={() => {
				copyToClipboardWithMeta(value);
				setHasCopied(true);
			}}
			{...props}
		>
			<span className="sr-only">Copy</span>
			{hasCopied ? <IconCheck /> : <IconCopy />}
		</Button>
	);
}
