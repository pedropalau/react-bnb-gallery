'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { type GalleryPhoto, ReactBnbGallery } from 'react-bnb-gallery';

import { PhotoGrid } from '@/components/photo-grid';
import { photoGridPhotos } from '@/components/photo-grid-photos';
import { Button } from '@/components/ui/button';

export default function HomePage() {
	const [open, setOpen] = useState(false);
	const [activePhotoIndex, setActivePhotoIndex] = useState(0);

	const galleryPhotos = useMemo<GalleryPhoto[]>(
		() =>
			photoGridPhotos.map((photo) => ({
				photo: photo.src,
				caption: photo.alt,
			})),
		[],
	);

	const handlePhotoPress = useCallback((src: string) => {
		const index = photoGridPhotos.findIndex((photo) => photo.src === src);
		setActivePhotoIndex(index >= 0 ? index : 0);
		setOpen(true);
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
					<Button size="lg" onClick={() => setOpen(true)}>
						Try the Demo
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/docs/installation">Read the Docs</Link>
					</Button>
				</div>
			</div>
			<div className="md:pt-6 lg:pt-8 xl:pt-10">
				<PhotoGrid
					className="px-4 md:px-6 lg:px-8 xl:px-10 mb-4 md:mb-6 lg:mb-8 xl:mb-10 mask-[linear-gradient(to_bottom,black_50%,transparent_98%)]"
					onPhotoPress={handlePhotoPress}
				/>
			</div>
			<ReactBnbGallery
				show={open}
				photos={galleryPhotos}
				activePhotoIndex={activePhotoIndex}
				onClose={() => setOpen(false)}
			/>
		</>
	);
}
