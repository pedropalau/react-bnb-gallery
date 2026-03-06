import type {
	ComponentType,
	CSSProperties,
	MouseEvent,
	ReactNode,
	Ref,
	TouchEvent,
	WheelEvent,
} from 'react';
import type { DefaultPhrases } from '../default-phrases';

/** Localization strings used throughout the gallery UI. */
export type GalleryPhrases = DefaultPhrases;

/** Represents a single photo entry in the gallery. */
export interface GalleryPhoto {
	/** URL of the full-size photo. */
	photo?: string;
	/** Display number shown in the lightbox. */
	number?: number;
	/** Accessible alt text for the full-size photo image. */
	alt?: string;
	/** Accessible alt text for the thumbnail image. */
	thumbnailAlt?: string;
	/** Primary caption displayed below the photo. */
	caption?: ReactNode;
	/** Secondary caption displayed below the primary caption. */
	subcaption?: ReactNode;
	/** URL of the thumbnail image used in the thumbnail strip. */
	thumbnail?: string;
	[key: string]: unknown;
}

/** Context provided to custom caption action renderers. */
export interface GalleryCaptionActionsContext {
	/** Current active photo index. */
	current: number;
	/** Currently active photo object, when available. */
	currentPhoto?: GalleryPhoto;
	/** Full normalized photo list. */
	photos: GalleryPhoto[];
	/** Whether the thumbnail strip is currently visible. */
	showThumbnails: boolean;
}

/** Render prop for injecting custom controls in the caption action area. */
export type GalleryRenderCaptionActions = (
	context: GalleryCaptionActionsContext,
) => ReactNode;

/** Class-name overrides for default gallery UI slots. */
export interface GalleryClassNames {
	modal?: string;
	overlay?: string;
	modalContainer?: string;
	closeButtonWrapper?: string;
	closeButton?: string;
	photoCounter?: string;
	gallery?: string;
	prevButton?: string;
	nextButton?: string;
	photoButton?: string;
	photoImage?: string;
	caption?: string;
	thumbnailsList?: string;
	thumbnailItem?: string;
	thumbnailButton?: string;
	thumbnailImage?: string;
	togglePhotoList?: string;
}

/** Inline style overrides for default gallery UI slots. */
export interface GalleryStyles {
	modal?: CSSProperties;
	overlay?: CSSProperties;
	modalContainer?: CSSProperties;
	closeButtonWrapper?: CSSProperties;
	closeButton?: CSSProperties;
	photoCounter?: CSSProperties;
	gallery?: CSSProperties;
	prevButton?: CSSProperties;
	nextButton?: CSSProperties;
	photoButton?: CSSProperties;
	photoImage?: CSSProperties;
	caption?: CSSProperties;
	thumbnailsList?: CSSProperties;
	thumbnailItem?: CSSProperties;
	thumbnailButton?: CSSProperties;
	thumbnailImage?: CSSProperties;
	togglePhotoList?: CSSProperties;
}

/** Props for overriding the modal close button component. */
export interface GalleryCloseButtonProps {
	onPress?: () => void;
	light?: boolean;
	phrases?: GalleryPhrases;
	className?: string;
	style?: CSSProperties;
}

/** Props for overriding the modal overlay component. */
export interface GalleryOverlayProps {
	className?: string;
	style?: CSSProperties;
	light?: boolean;
	opacity?: number;
	backgroundColor?: string;
}

/** Props for overriding the top photo counter component. */
export interface GalleryPhotoCounterProps {
	current: number;
	total: number;
	label: string;
	className?: string;
	style?: CSSProperties;
}

/** Props for overriding the modal content container wrapper. */
export interface GalleryModalContainerProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

/** Shared props for overriding previous/next navigation controls. */
export interface GalleryControlButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	/** Exposed for custom controls; default controls inherit light mode from CSS tokens. */
	light?: boolean;
	phrases?: GalleryPhrases;
	className?: string;
	style?: CSSProperties;
}

/** Props for overriding the active gallery photo component. */
export interface GalleryPhotoComponentProps {
	photo?: GalleryPhoto | null;
	onPress?: () => void;
	onTouchStart?: (event: TouchEvent<HTMLButtonElement>) => void;
	onTouchMove?: (event: TouchEvent<HTMLButtonElement>) => void;
	onTouchEnd?: (event: TouchEvent<HTMLButtonElement>) => void;
	onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
	onMouseMove?: (event: MouseEvent<HTMLButtonElement>) => void;
	onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
	onWheel?: (event: WheelEvent<HTMLButtonElement>) => void;
	onLoad?: () => void;
	onError?: () => void;
	style?: CSSProperties;
	buttonClassName?: string;
	buttonStyle?: CSSProperties;
	imageClassName?: string;
	imageStyle?: CSSProperties;
	buttonRef?: Ref<HTMLButtonElement>;
	imageRef?: Ref<HTMLImageElement>;
	disablePress?: boolean;
	enableZoom?: boolean;
	isZoomMode?: boolean;
	isPanning?: boolean;
}

/** Props for overriding the thumbnail strip visibility toggle component. */
export interface GalleryTogglePhotoListComponentProps {
	isOpened?: boolean;
	onPress?: () => void;
	phrases?: GalleryPhrases;
	className?: string;
	style?: CSSProperties;
}

/** Props for overriding the thumbnail item component. */
export interface GalleryThumbnailComponentProps {
	active?: boolean;
	photo?: GalleryPhoto | null;
	onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
	number?: number;
	className?: string;
	style?: CSSProperties;
	imageClassName?: string;
	imageStyle?: CSSProperties;
}

/** Props for overriding the gallery caption component. */
export interface GalleryCaptionComponentProps {
	current?: number;
	onPress?: (index: number) => void;
	photos?: GalleryPhoto[];
	phrases?: GalleryPhrases;
	renderCaptionActions?: GalleryRenderCaptionActions;
	showThumbnails?: boolean;
	components?: Pick<GalleryComponents, 'Thumbnail' | 'TogglePhotoList'>;
	className?: string;
	style?: CSSProperties;
	thumbnailsListClassName?: string;
	thumbnailsListStyle?: CSSProperties;
	thumbnailItemClassName?: string;
	thumbnailItemStyle?: CSSProperties;
	thumbnailClassName?: string;
	thumbnailStyle?: CSSProperties;
	thumbnailImageClassName?: string;
	thumbnailImageStyle?: CSSProperties;
	togglePhotoListClassName?: string;
	togglePhotoListStyle?: CSSProperties;
}

/** Slot components that can be overridden to customize gallery UI rendering. */
export interface GalleryComponents {
	Overlay?: ComponentType<GalleryOverlayProps>;
	PhotoCounter?: ComponentType<GalleryPhotoCounterProps>;
	ModalContainer?: ComponentType<GalleryModalContainerProps>;
	CloseButton?: ComponentType<GalleryCloseButtonProps>;
	PrevButton?: ComponentType<GalleryControlButtonProps>;
	NextButton?: ComponentType<GalleryControlButtonProps>;
	Photo?: ComponentType<GalleryPhotoComponentProps>;
	Caption?: ComponentType<GalleryCaptionComponentProps>;
	Thumbnail?: ComponentType<GalleryThumbnailComponentProps>;
	TogglePhotoList?: ComponentType<GalleryTogglePhotoListComponentProps>;
}

/** Exposes navigation controls for programmatic gallery control. */
export interface GalleryController {
	/** Navigate to the previous photo. */
	prev: () => void;
	/** Navigate to the next photo. */
	next: () => void;
}
