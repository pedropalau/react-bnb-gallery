'use client';

import { Edit04Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type React from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function DocsPage({
	path,
	title,
	description,
	className,
	children,
	...rest
}: React.ComponentPropsWithRef<'div'> & {
	path: string;
	title: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<div
			data-slot="docs-page"
			className={cn('flex min-w-0 flex-1 flex-col', className)}
			{...rest}
		>
			<div className="h-(--top-spacing) shrink-0" />
			<div className="mx-auto flex w-full max-w-[40rem] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between md:items-start">
						<h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
							{title}
						</h1>
					</div>
					<p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
						{description}
					</p>
				</div>
				<div className="w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
					{children}
				</div>
				<div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0">
					<Button variant="secondary" asChild>
						<a
							href={`https://github.com/pedropalau/react-bnb-gallery/tree/master/docs/app/docs/${path}/page.tsx`}
							rel="noopener noreferrer"
							target="_blank"
						>
							<HugeiconsIcon icon={Edit04Icon} />
							Edit this page on GitHub
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}

export function DocsPageHeading2({
	className,
	...rest
}: React.ComponentPropsWithRef<'h2'>) {
	return (
		<h2
			data-slot="docs-page-h2"
			className={cn(
				'font-heading [&+]*:[code]:text-xl mt-10 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!',
				className,
			)}
			{...rest}
		/>
	);
}

export function DocsPageParagraph({
	className,
	...rest
}: React.ComponentPropsWithRef<'p'>) {
	return (
		<p
			data-slot="docs-page-p"
			className={cn('leading-relaxed not-first:mt-6 text-base', className)}
			{...rest}
		/>
	);
}

export function DocsPageAnchor({
	className,
	...rest
}: React.ComponentPropsWithRef<'a'>) {
	return (
		<a
			data-slot="docs-page-a"
			className={cn('font-medium underline underline-offset-2', className)}
			{...rest}
		/>
	);
}
