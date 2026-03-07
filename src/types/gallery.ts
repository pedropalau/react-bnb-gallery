import type {
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	ComponentType,
	CSSProperties,
	MouseEvent,
	ReactNode,
	Ref,
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

/** Motion presets for image transition behavior. */
export type GalleryAnimationPreset = 'none' | 'fade' | 'slide' | 'zoom';

/** Motion presets for gallery open transitions. */
export type GalleryOpenAnimationPreset = 'none' | 'fade' | 'fade-up' | 'zoom';

/** Motion presets for gallery close transitions. */
export type GalleryCloseAnimationPreset =
	| 'none'
	| 'fade'
	| 'fade-down'
	| 'zoom';

/** Image fitting strategy for the active gallery photo. */
export type GalleryImageFit = 'contain' | 'cover';

/** Optional animation controls for transition and feedback motion. */
export interface GalleryAnimationOptions {
	/** Motion preset used when switching photos. */
	preset?: GalleryAnimationPreset;
	/** Duration of gallery motion transitions in milliseconds. */
	durationMs?: number;
	/** CSS timing function used for transitions and keyframe animations. */
	easing?: string;
	/** Motion preset used when the modal opens. */
	openPreset?: GalleryOpenAnimationPreset;
	/** Duration of modal open animation in milliseconds. */
	openDurationMs?: number;
	/** CSS timing function for modal open animation. */
	openEasing?: string;
	/** Motion preset used when the modal closes. */
	closePreset?: GalleryCloseAnimationPreset;
	/** Duration of modal close animation in milliseconds. */
	closeDurationMs?: number;
	/** CSS timing function for modal close animation. */
	closeEasing?: string;
	/** Enables/disables press feedback animations for controls and thumbnails. */
	enableFeedback?: boolean;
	/** Scale factor applied for press feedback (`0.9` to `1`, default `0.97`). */
	feedbackScale?: number;
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
export interface GalleryCloseButtonProps
	extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
	onPress?: () => void;
	light?: boolean;
	phrases?: GalleryPhrases;
}

/** Props for overriding the modal overlay component. */
export interface GalleryOverlayProps extends ComponentPropsWithRef<'div'> {
	light?: boolean;
	opacity?: number;
}

/** Props for overriding the top photo counter component. */
export interface GalleryPhotoCounterProps extends ComponentPropsWithRef<'p'> {
	current: number;
	total: number;
	label: string;
}

/** Props for overriding the modal content container wrapper. */
export interface GalleryModalContainerProps
	extends ComponentPropsWithRef<'div'> {}

/** Shared props for overriding previous/next navigation controls. */
export interface GalleryControlButtonProps
	extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
	onPress?: () => void;
	phrases?: GalleryPhrases;
}

/** Props for overriding the active gallery photo component. */
export interface GalleryPhotoComponentProps
	extends Omit<
		ComponentPropsWithoutRef<'button'>,
		| 'onClick'
		| 'className'
		| 'style'
		| 'children'
		| 'ref'
		| 'onLoad'
		| 'onError'
	> {
	photo?: GalleryPhoto | null;
	onPress?: () => void;
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
	imageFit?: GalleryImageFit;
}

/** Props for overriding the thumbnail strip visibility toggle component. */
export interface GalleryTogglePhotoListComponentProps
	extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
	isOpened?: boolean;
	onPress?: () => void;
	phrases?: GalleryPhrases;
}

/** Props for overriding the thumbnail item component. */
export interface GalleryThumbnailComponentProps
	extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
	active?: boolean;
	photo?: GalleryPhoto | null;
	onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
	number?: number;
	imageClassName?: string;
	imageStyle?: CSSProperties;
}

/** Props for overriding the gallery caption component. */
export interface GalleryCaptionComponentProps
	extends ComponentPropsWithRef<'figcaption'> {
	current?: number;
	onPress?: (index: number) => void;
	photos?: GalleryPhoto[];
	phrases?: GalleryPhrases;
	renderCaptionActions?: GalleryRenderCaptionActions;
	showThumbnails?: boolean;
	components?: Pick<GalleryComponents, 'Thumbnail' | 'TogglePhotoList'>;
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
