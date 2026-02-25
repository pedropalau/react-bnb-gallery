'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import PhotoGrid from '@/components/photo-grid';
import { Button } from '@/components/ui/button';
import photos from '@/constants/photos';

export default function HomePage() {
	const [isOpen, setOpen] = useState(false);

	const toggleGallery = useCallback(() => {
		setOpen((value) => !value);
	}, []);

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
					<Button size="lg" onClick={toggleGallery}>
						Try the Demo
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/docs/installation">Read the Docs</Link>
					</Button>
				</div>
			</div>
			<PhotoGrid />
			<ReactBnbGallery
				show={isOpen}
				photos={photos}
				backgroundColor="rgba(0,0,0,0.9)"
				onClose={toggleGallery}
			/>
		</>
	);
}
