'use client';

import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';

import type { Photo } from '@/components/photo-grid-types';
import { cn } from '@/lib/utils';

type GridImageProps = {
	photo: Photo;
	sizes: string;
	onPress?: (src: string) => void;
};

export const GridImage = memo(function GridImage({
	photo,
	sizes,
	onPress,
}: GridImageProps) {
	const [loaded, setLoaded] = useState(false);
	const delay = useRef(Math.random() * 800);

	const handleClick = useCallback(() => {
		onPress?.(photo.src);
	}, [onPress, photo.src]);

	return (
		<button
			className="block h-full w-full focus-visible:outline-none overflow-hidden rounded-lg lg:rounded-xl xl:rounded-2xl relative bg-muted"
			onClick={handleClick}
			type="button"
		>
			<figure className="relative h-full">
				<Image
					alt={photo.alt}
					className={cn(
						'object-cover',
						!loaded && 'opacity-0',
						loaded &&
							'opacity-100 transition-opacity duration-1000 ease-in-out',
					)}
					fill
					onError={() => setLoaded(true)}
					onLoad={() => setLoaded(true)}
					sizes={sizes}
					src={photo.src}
					style={loaded ? { transitionDelay: `${delay.current}ms` } : undefined}
				/>
				<figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-2 pt-10 text-left">
					<span className="block truncate text-[10px] uppercase tracking-[0.12em] text-white/70">
						Photo by
					</span>
					<span className="block truncate text-xs font-medium text-white">
						{photo.authorName}
					</span>
				</figcaption>
			</figure>
		</button>
	);
});
