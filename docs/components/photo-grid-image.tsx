'use client';

import classnames from 'classnames';
import { useCallback, useState } from 'react';

export function GridImage({
	src,
	width = 100,
	height = 100,
	alt = 'bnbgallery',
	onPress,
}: {
	src: string;
	width?: number;
	height?: number;
	alt?: string;
	onPress?: (src: string) => void;
}) {
	const [loading, setLoading] = useState(true);

	const handleClick = useCallback(() => {
		onPress?.(src);
	}, [onPress, src]);

	return (
		<button
			className="block w-full focus:outline-none"
			onClick={handleClick}
			type="button"
		>
			<figure className="relative max-h-full min-w-full max-w-full cursor-pointer overflow-hidden">
				<div className="w-full bg-green-500">
					<img
						alt={alt}
						className={classnames(
							'block h-auto w-full object-cover',
							loading && 'opacity-0',
							!loading &&
								'opacity-1 transition-opacity duration-1000 ease-in-out',
						)}
						width={width}
						height={height}
						src={src}
						onLoad={() => setLoading(false)}
						onError={() => setLoading(false)}
					/>
				</div>
			</figure>
		</button>
	);
}

export default GridImage;
