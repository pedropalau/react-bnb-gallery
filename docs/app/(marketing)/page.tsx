'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import PhotoGrid from '@/components/photo-grid';
import photos from '@/constants/photos';

export default function HomePage() {
	const [isOpen, setOpen] = useState(false);

	const toggleGallery = useCallback(() => {
		setOpen((value) => !value);
	}, []);

	return (
		<>
			<div className="container mx-auto flex max-w-5xl flex-col items-start px-6 py-10 md:px-10 lg:pb-32 lg:pt-20">
				<div className="lg:w-2/3">
					<h1 className="text-3xl font-light leading-snug text-black md:text-4xl">
						Friendly, customizable and accessible-ready simple photo gallery
						based on <b className="font-semibold">React</b>.
					</h1>
					<div className="mt-10 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
						<button
							type="button"
							className="inline-flex cursor-pointer items-center justify-center rounded border border-transparent bg-black py-5 font-semibold text-white shadow hover:bg-green-500 focus:bg-green-600 focus:shadow-outline-green focus:outline-none md:px-4 md:py-2"
							onClick={toggleGallery}
						>
							View Demo Gallery
						</button>
						<Link
							href="/docs/installation"
							className="inline-flex cursor-pointer items-center justify-center rounded border border-gray-600 bg-white py-5 font-semibold text-gray-900 shadow hover:border-black hover:bg-black hover:text-gray-100 focus:border-gray-900 focus:bg-black focus:text-gray-100 focus:shadow-outline-gray focus:outline-none md:px-4 md:py-2"
						>
							Get Started
						</Link>
					</div>
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
