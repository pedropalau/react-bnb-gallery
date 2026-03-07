import clsx from 'clsx';
import { defaultPhrases } from '../default-phrases';
import type { GalleryCloseButtonProps } from '../types/gallery';

const iconStyle = {
	height: '2em',
	width: '2em',
};
/** Path coordinates stay within the 24x24 viewBox bounds to avoid icon clipping. */
const CLOSE_BUTTON_PATH =
	'm23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22';

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
