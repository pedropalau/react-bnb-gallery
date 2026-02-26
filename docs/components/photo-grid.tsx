'use client';

import type React from 'react';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import { GridImage } from '@/components/photo-grid-image';
import { photoGridPhotos } from '@/components/photo-grid-photos';
import type { Photo } from '@/components/photo-grid-types';
import { cn } from '@/lib/utils';

export function PhotoGrid({
	columns = 8,
	photos = photoGridPhotos,
	onPhotoPress,
	style,
	className,
	...rest
}: React.ComponentPropsWithRef<'div'> & {
	columns?: number;
	photos?: Photo[];
	onPhotoPress?: (src: string) => void;
}) {
	const safeColumns = Number.isFinite(columns)
		? Math.max(1, Math.floor(columns))
		: 1;

	const photoColumns = useMemo(() => {
		const cols: Photo[][] = Array.from({ length: safeColumns }, () => []);

		photos.forEach((photo, index) => {
			cols[index % safeColumns].push(photo);
		});

		return cols.filter((column) => column.length > 0);
	}, [photos, safeColumns]);

	const gridStyle = useMemo(
		() =>
			({
				'--photo-grid-columns': safeColumns,
				...style,
			}) as CSSProperties,
		[safeColumns, style],
	);

	const imageSizes = useMemo(
		() => `(max-width: 767px) 100vw, ${(100 / safeColumns).toFixed(2)}vw`,
		[safeColumns],
	);

	return (
		<div
			data-slot="photo-grid"
			className={cn(
				'grid grid-cols-1 gap-2 md:[grid-template-columns:repeat(var(--photo-grid-columns),minmax(0,1fr))]',
				className,
			)}
			style={gridStyle}
			{...rest}
		>
			{photoColumns.map((column, columnIndex) => (
				<div
					key={`column-${columnIndex + 1}`}
					className="grid gap-2 md:h-[72vh]"
					style={{
						gridTemplateRows: column
							.map((photo) => `${photo.height}fr`)
							.join(' '),
					}}
				>
					{column.map((photo) => (
						<GridImage
							key={photo.src}
							onPress={onPhotoPress}
							photo={photo}
							sizes={imageSizes}
						/>
					))}
				</div>
			))}
		</div>
	);
}
