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
	thumbnailsWrapper: HTMLDivElement,
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

		if (secondThumbnail) {
			const secondRect = secondThumbnail.getBoundingClientRect();
			const measuredStep = secondRect.left - firstRect.left;
			if (measuredStep > 0) {
				measuredLayout.thumbnailStep = measuredStep;
			}
		}
	}

	const containerStyles = window.getComputedStyle(thumbnailsWrapper);
	const viewportInset =
		Math.abs(parsePixelValue(containerStyles.marginLeft)) +
		Math.abs(parsePixelValue(containerStyles.marginRight));
	if (viewportInset > 0) {
		measuredLayout.thumbnailViewportInset = viewportInset;
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

	const syncRef = useRef<() => void>(() => {});

	const syncThumbnailLayout = useCallback(() => {
		if (!thumbnailsWrapperRef.current || !thumbnailsListRef.current) {
			return;
		}

		const measuredLayout = getMeasuredThumbnailLayout(
			thumbnailsListRef.current,
			thumbnailsWrapperRef.current,
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

	syncRef.current = syncThumbnailLayout;

	useEffect(() => {
		syncThumbnailLayout();
	}, [syncThumbnailLayout]);

	useEffect(() => {
		const handler = () => syncRef.current();
		window.addEventListener('resize', handler, { passive: true });
		return () => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	return {
		thumbnailLayout,
		thumbnailsWrapperRef,
		thumbnailsListRef,
		syncThumbnailLayout,
	};
}
