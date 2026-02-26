'use client';

import { IconCheck, IconCopy, IconTerminal } from '@tabler/icons-react';
import * as React from 'react';
import { copyToClipboardWithMeta } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConfig } from '@/hooks/use-config';

export function CodeBlockCommand({
	__npm__,
	__yarn__,
	__pnpm__,
}: React.ComponentProps<'pre'> & {
	__npm__?: string;
	__yarn__?: string;
	__pnpm__?: string;
}) {
	const [config, setConfig] = useConfig();
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		if (hasCopied) {
			const timer = setTimeout(() => setHasCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [hasCopied]);

	const packageManager = config.packageManager || 'pnpm';
	const tabs = React.useMemo(() => {
		return {
			pnpm: __pnpm__,
			npm: __npm__,
			yarn: __yarn__,
		};
	}, [__npm__, __pnpm__, __yarn__]);

	const copyCommand = React.useCallback(() => {
		const command = tabs[packageManager];

		if (!command) {
			return;
		}

		copyToClipboardWithMeta(command);
		setHasCopied(true);
	}, [packageManager, tabs]);

	return (
		<div className="bg-muted text-foreground rounded-lg mt-4 lg:mt-6 overflow-hidden text-sm relative">
			<div className="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0">
				<div className="overflow-x-auto">
					<Tabs
						value={packageManager}
						className="gap-0"
						onValueChange={(value) => {
							setConfig({
								...config,
								packageManager: value as 'pnpm' | 'npm' | 'yarn',
							});
						}}
					>
						<div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
							<div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
								<IconTerminal className="text-muted size-3" />
							</div>
							<TabsList className="rounded-none bg-transparent p-0">
								{Object.entries(tabs).map(([key]) => {
									return (
										<TabsTrigger
											key={key}
											value={key}
											className="data-[state=active]:bg-background! data-[state=active]:border-input h-7 border border-transparent pt-0.5 shadow-none!"
										>
											{key}
										</TabsTrigger>
									);
								})}
							</TabsList>
						</div>
						<div className="no-scrollbar overflow-x-auto">
							{Object.entries(tabs).map(([key, value]) => {
								return (
									<TabsContent
										key={key}
										value={key}
										className="mt-0 px-4 py-3.5"
									>
										<pre>
											<code
												className="relative font-mono text-sm leading-none"
												data-language="bash"
											>
												{value}
											</code>
										</pre>
									</TabsContent>
								);
							})}
						</div>
					</Tabs>
					<Button
						data-slot="copy-button"
						size="icon"
						variant="ghost"
						className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
						onClick={copyCommand}
					>
						<span className="sr-only">Copy</span>
						{hasCopied ? <IconCheck /> : <IconCopy />}
					</Button>
				</div>
			</div>
		</div>
	);
}
