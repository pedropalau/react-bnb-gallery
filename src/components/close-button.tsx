import clsx from 'clsx';
import type { GalleryCloseButtonProps } from '../types/gallery';

const CLOSE_PATH =
	'm23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22';

const buttonStyle = {
	height: '2em',
	width: '2em',
	display: 'block',
};

/**
 * Renders the icon button used to close the gallery modal.
 */
function CloseButton({
	onPress,
	light: _light = false,
	className,
	style,
}: GalleryCloseButtonProps) {
	return (
		<button
			onClick={onPress}
			className={clsx('gallery-close', className)}
			style={style}
			type="button"
			aria-label="Close gallery"
			aria-busy={false}
		>
			<svg
				viewBox="0 0 24 24"
				role="img"
				focusable="false"
				className="gallery-close-icon"
				style={buttonStyle}
			>
				<path d={CLOSE_PATH} fillRule="evenodd" />
			</svg>
		</button>
	);
}

export { CloseButton };
