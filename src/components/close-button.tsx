import clsx from 'clsx';
import { CLOSE_BUTTON_PATH } from '../constants';
import { defaultPhrases } from '../default-phrases';
import type { GalleryCloseButtonProps } from '../types/gallery';

const iconStyle = {
	height: '2em',
	width: '2em',
};

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
				viewBox="0 0 24 24"
				focusable="false"
				aria-hidden="true"
				className="gallery-close-icon"
				style={iconStyle}
			>
				<path d={CLOSE_BUTTON_PATH} fillRule="evenodd" />
			</svg>
		</button>
	);
}

export { CloseButton };
