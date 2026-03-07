import clsx from 'clsx';
import { defaultPhrases } from '../default-phrases';
import type { GalleryCloseButtonProps } from '../types/gallery';

/**
 * Renders the icon button used to close the gallery modal.
 */
function CloseButton({
	onPress,
	light = false,
	phrases = defaultPhrases,
	className,
	...props
}: GalleryCloseButtonProps) {
	return (
		<button
			onClick={onPress}
			className={clsx(
				'gallery-close',
				light && 'gallery-close--light',
				className,
			)}
			type="button"
			aria-label={phrases.closeGallery}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="gallery-close-icon"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18 18 6M6 6l12 12"
				/>
			</svg>
		</button>
	);
}

export { CloseButton };
