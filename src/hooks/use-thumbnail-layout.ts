import { useCallback, useEffect, useRef, useState } from 'react';
import {
	calculateThumbnailsLeftScroll,
	type ThumbnailLayoutDimensions,
} from '../utils/thumbnail-layout';

function parsePixelValue(value?: string): number {
	if (!value) {
		return 0;
	}

	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function getMeasuredThumbnailLayout(
	thumbnailsList: HTMLUListElement,
): ThumbnailLayoutDimensions {
	const thumbnailItems = thumbnailsList.querySelectorAll<HTMLLIElement>('li');
	const firstThumbnail = thumbnailItems[0];
	const secondThumbnail = thumbnailItems[1];
	const measuredLayout: ThumbnailLayoutDimensions = {};

	if (firstThumbnail) {
		const firstRect = firstThumbnail.getBoundingClientRect();
		if (firstRect.width > 0) {
			measuredLayout.thumbnailFrameWidth = firstRect.width;
		}
	}

	if (firstThumbnail && secondThumbnail) {
		const firstRect = firstThumbnail.getBoundingClientRect();
		const secondRect = secondThumbnail.getBoundingClientRect();
		const measuredStep = secondRect.left - firstRect.left;
		if (measuredStep > 0) {
			measuredLayout.thumbnailStep = measuredStep;
		}
	}

	const thumbnailsContainer = thumbnailsList.parentElement;
	if (thumbnailsContainer) {
		const containerStyles = window.getComputedStyle(thumbnailsContainer);
		const viewportInset =
			Math.abs(parsePixelValue(containerStyles.marginLeft)) +
			Math.abs(parsePixelValue(containerStyles.marginRight));
		if (viewportInset > 0) {
			measuredLayout.thumbnailViewportInset = viewportInset;
		}
	}

	return measuredLayout;
}

function areThumbnailLayoutsEqual(
	prevLayout: ThumbnailLayoutDimensions,
	nextLayout: ThumbnailLayoutDimensions,
): boolean {
	return (
		prevLayout.thumbnailFrameWidth === nextLayout.thumbnailFrameWidth &&
		prevLayout.thumbnailStep === nextLayout.thumbnailStep &&
		prevLayout.thumbnailViewportInset === nextLayout.thumbnailViewportInset
	);
}

interface UseThumbnailLayoutOptions {
	current: number;
	totalPhotos: number;
}

export function useThumbnailLayout({
	current,
	totalPhotos,
}: UseThumbnailLayoutOptions) {
	const [thumbnailLayout, setThumbnailLayout] =
		useState<ThumbnailLayoutDimensions>({});
	const thumbnailsWrapperRef = useRef<HTMLDivElement | null>(null);
	const thumbnailsListRef = useRef<HTMLUListElement | null>(null);

	const syncThumbnailLayout = useCallback(() => {
		if (!thumbnailsWrapperRef.current || !thumbnailsListRef.current) {
			return;
		}

		const measuredLayout = getMeasuredThumbnailLayout(
			thumbnailsListRef.current,
		);
		setThumbnailLayout((previousLayout) =>
			areThumbnailLayoutsEqual(previousLayout, measuredLayout)
				? previousLayout
				: measuredLayout,
		);
		const bounding = thumbnailsWrapperRef.current.getBoundingClientRect();
		const scrollLeft = calculateThumbnailsLeftScroll(
			current,
			totalPhotos,
			bounding,
			measuredLayout,
		);
		thumbnailsListRef.current.style.marginLeft = `${scrollLeft}px`;
	}, [current, totalPhotos]);

	useEffect(() => {
		syncThumbnailLayout();
	}, [syncThumbnailLayout]);

	useEffect(() => {
		window.addEventListener('resize', syncThumbnailLayout);
		return () => {
			window.removeEventListener('resize', syncThumbnailLayout);
		};
	}, [syncThumbnailLayout]);

	return {
		thumbnailLayout,
		thumbnailsWrapperRef,
		thumbnailsListRef,
		syncThumbnailLayout,
	};
}
