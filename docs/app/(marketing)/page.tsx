'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type GalleryPhoto, ReactBnbGallery } from 'react-bnb-gallery';

import { PhotoGrid } from '@/components/photo-grid';
import { Button } from '@/components/ui/button';

const photos: GalleryPhoto[] = [
	{
		photo:
			'https://images.unsplash.com/photo-1470238660368-09dd17cab0b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Sunset',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1565472604484-fd8b0414aaf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Venom',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1594240094495-1b9177b5fefc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Beach',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593773271567-b13ceb8ce8ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1204&q=100',
		caption: 'Summer & Earth Colors',
		subcaption: 'By @cbarbalis',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593200931138-001b51a74284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Paceful',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593616471742-f31639185abd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Wonderful View',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593270573246-2dca2f2c1c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=100',
		caption: 'Quite Night',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1592407815059-d10df1905661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Alone',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1592334454447-7d0aa7feda01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Colors',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1591981093673-984cd7de9ca4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Health Green',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1591254267182-4211662a0c00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Pretty Green',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593286880275-cc4aee0fb836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=100',
		caption: 'Cold Forest',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1593616469718-20c25ba3d611?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
		caption: 'White',
	},
] as const;

export default function HomePage() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="container flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
				<h1 className="text-primary leading-tighter text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
					The photo gallery component for <b className="font-semibold">React</b>
				</h1>
				<p className="text-foreground max-w-4xl text-base text-balance sm:text-lg">
					A lightweight, accessible, and fully customizable lightbox gallery
					inspired by the Airbnb photo gallery. Drop it into any React project
					and let your photos shine.
				</p>
				<div className="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none">
					<Button size="lg" onClick={() => setOpen(true)}>
						Try the Demo
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/docs/installation">Read the Docs</Link>
					</Button>
				</div>
			</div>
			<div className="md:pt-6 lg:pt-8 xl:pt-10">
				<PhotoGrid className="px-4 md:px-6 lg:px-8 xl:px-10 mb-4 md:mb-6 lg:mb-8 xl:mb-10 mask-[linear-gradient(to_bottom,black_50%,transparent_98%)]" />
			</div>
			<ReactBnbGallery
				show={open}
				photos={photos}
				backgroundColor="rgba(0,0,0,0.9)"
				onClose={() => setOpen(false)}
			/>
		</>
	);
}
