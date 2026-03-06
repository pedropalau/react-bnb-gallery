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

/** Props for overriding the modal close button component. */
export interface GalleryCloseButtonProps {
	onPress?: () => void;
	light?: boolean;
}

/** Shared props for overriding previous/next navigation controls. */
export interface GalleryControlButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	light?: boolean;
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
}

/** Props for overriding the thumbnail item component. */
export interface GalleryThumbnailComponentProps {
	active?: boolean;
	photo?: GalleryPhoto | null;
	onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
	number?: number;
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
}

/** Slot components that can be overridden to customize gallery UI rendering. */
export interface GalleryComponents {
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
