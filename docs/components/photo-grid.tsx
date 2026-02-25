'use client';

import { useMemo } from 'react';
import GridImage from './photo-grid-image';
import photos from './photo-grid-photos';
import type { GridPhoto } from './photo-grid-types';

export function PhotoGrid({
	photosPerColumn = 3,
	onPhotoPress = () => {},
}: {
	photosPerColumn?: number;
	onPhotoPress?: (src: string) => void;
}) {
	const columns = useMemo(() => {
		return photos.reduce<GridPhoto[][]>((acc, photo, index) => {
			const columnIndex = index % photosPerColumn;
			if (!acc[columnIndex]) {
				acc[columnIndex] = [];
			}
			acc[columnIndex].push(photo);
			return acc;
		}, []);
	}, [photosPerColumn]);

	return (
		<div className="relative">
			<div className="grid grid-cols-1 gap-px md:grid-cols-8">
				{columns.map((column, index) => (
					<div key={`column-${index}`} className="flex flex-col space-y-px">
						{column.map((photo) => (
							<GridImage
								key={photo.src}
								onPress={onPhotoPress}
								src={photo.src}
								width={photo.width}
								height={photo.height}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default PhotoGrid;
