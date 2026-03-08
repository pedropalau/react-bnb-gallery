import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { Gallery } from '../../src/components/gallery';

import photos from '../test-photos';

function createMatchMediaMock(matches) {
	return vi.fn().mockImplementation((query) => ({
		matches,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));
}

describe('Gallery', () => {
	describe('#render', () => {
		it('renders <Caption />', () => {
			const { container } = render(<Gallery photos={photos} showThumbnails />);
			expect(
				container.querySelector('figcaption.gallery-figcaption'),
			).toBeInTheDocument();
		});
		it('<Caption /> is not rendered if props.showThumbnails === false', () => {
			const { container } = render(
				<Gallery photos={photos} showThumbnails={false} />,
			);
			expect(
				container.querySelector('figcaption.gallery-figcaption'),
			).not.toBeInTheDocument();
		});

		it('renders preload photos', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 3)}
					preloadSize={2}
					showThumbnails={false}
				/>,
			);

			expect(
				container.querySelectorAll('.gallery-modal--preload img'),
			).toHaveLength(2);
		});

		it('preloads photos nearest to the active index', () => {
			const photoList = photos.slice(0, 5);
			const { container } = render(
				<Gallery
					photos={photoList}
					preloadSize={2}
					showThumbnails={false}
					activePhotoIndex={2}
				/>,
			);

			const preloadSources = Array.from(
				container.querySelectorAll('.gallery-modal--preload img'),
			).map((image) => image.getAttribute('src'));

			expect(preloadSources).toHaveLength(2);
			expect(preloadSources).toContain(photoList[1].photo);
			expect(preloadSources).toContain(photoList[3].photo);
			expect(preloadSources).not.toContain(photoList[2].photo);
		});

		it('does not render skeleton placeholders immediately while images are loading', () => {
			const { container } = render(<Gallery photos={photos} showThumbnails />);

			expect(
				container.querySelector(
					'.gallery-photo .gallery-image-skeleton--photo',
				),
			).not.toBeInTheDocument();
			expect(
				container.querySelector(
					'.gallery-thumbnail-button .gallery-image-skeleton--thumbnail',
				),
			).not.toBeInTheDocument();
			expect(
				container.querySelector('.loading-spinner'),
			).not.toBeInTheDocument();
		});

		it('adds a loaded class to thumbnail images once they finish loading', () => {
			const { container } = render(<Gallery photos={photos} showThumbnails />);
			const thumbnailImage = container.querySelector(
				'.gallery-thumbnail-image',
			);

			expect(thumbnailImage).toHaveClass('gallery-image--loading');
			fireEvent.load(thumbnailImage);
			return waitFor(() => {
				expect(thumbnailImage).toHaveClass('gallery-image--loaded');
				expect(thumbnailImage).not.toHaveClass('gallery-image--loading');
			});
		});

		it('updates controls when photos prop changes', () => {
			const { container, rerender } = render(
				<Gallery photos={photos.slice(0, 1)} showThumbnails={false} />,
			);

			expect(
				container.querySelector('.gallery-control--next'),
			).not.toBeInTheDocument();

			rerender(<Gallery photos={photos.slice(0, 2)} showThumbnails={false} />);

			expect(
				container.querySelector('.gallery-control--next'),
			).toBeInTheDocument();
		});

		it('keeps both controls visible when wrap is enabled', () => {
			const photoList = photos.slice(0, 2);
			const { container, rerender } = render(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					wrap
					activePhotoIndex={0}
				/>,
			);

			expect(
				container.querySelector('.gallery-control--prev'),
			).toBeInTheDocument();
			expect(
				container.querySelector('.gallery-control--next'),
			).toBeInTheDocument();

			rerender(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					wrap
					activePhotoIndex={1}
				/>,
			);

			expect(
				container.querySelector('.gallery-control--prev'),
			).toBeInTheDocument();
			expect(
				container.querySelector('.gallery-control--next'),
			).toBeInTheDocument();
		});

		it('hides boundary controls when wrap is disabled', () => {
			const photoList = photos.slice(0, 2);
			const { container, rerender } = render(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					wrap={false}
					activePhotoIndex={0}
				/>,
			);

			expect(
				container.querySelector('.gallery-control--prev'),
			).not.toBeInTheDocument();
			expect(
				container.querySelector('.gallery-control--next'),
			).toBeInTheDocument();

			rerender(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					wrap={false}
					activePhotoIndex={1}
				/>,
			);

			expect(
				container.querySelector('.gallery-control--prev'),
			).toBeInTheDocument();
			expect(
				container.querySelector('.gallery-control--next'),
			).not.toBeInTheDocument();
		});

		it('supports placing controls in a top row', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					wrap
					controlsPlacement="top"
				/>,
			);

			expect(container.querySelector('.gallery-main')).toHaveClass(
				'gallery-main--controls-top',
			);
			expect(
				container.querySelector(
					'.gallery-controls-row--top .gallery-control--prev',
				),
			).toBeInTheDocument();
			expect(
				container.querySelector(
					'.gallery-controls-row--top .gallery-control--next',
				),
			).toBeInTheDocument();
		});

		it('renders accessible labels on navigation controls', () => {
			const { container } = render(
				<Gallery photos={photos.slice(0, 2)} showThumbnails={false} wrap />,
			);

			expect(container.querySelector('.gallery-control--prev')).toHaveAttribute(
				'aria-label',
				'Previous photo',
			);
			expect(container.querySelector('.gallery-control--next')).toHaveAttribute(
				'aria-label',
				'Next photo',
			);
		});

		it('uses localized labels for controls and thumbnail navigation', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails
					wrap
					phrases={{
						previousPhoto: 'Foto anterior',
						nextPhoto: 'Foto siguiente',
						thumbnailNavigation: 'Navegación de miniaturas',
					}}
				/>,
			);

			expect(container.querySelector('.gallery-control--prev')).toHaveAttribute(
				'aria-label',
				'Foto anterior',
			);
			expect(container.querySelector('.gallery-control--next')).toHaveAttribute(
				'aria-label',
				'Foto siguiente',
			);
			expect(
				container.querySelector('.gallery-figcaption--thumbnails'),
			).toHaveAttribute('aria-label', 'Navegación de miniaturas');
		});

		it('syncs caption content when activePhotoIndex prop changes', () => {
			const photoList = photos.slice(0, 2);
			const { container, rerender } = render(
				<Gallery photos={photoList} showThumbnails activePhotoIndex={0} />,
			);

			expect(container.querySelector('.photo-caption')).toHaveTextContent(
				photoList[0].caption,
			);

			rerender(
				<Gallery photos={photoList} showThumbnails activePhotoIndex={1} />,
			);

			expect(container.querySelector('.photo-caption')).toHaveTextContent(
				photoList[1].caption,
			);
		});

		it('uses caption as fallback alt text when alt fields are not provided', () => {
			const photoList = [
				{
					photo: 'https://example.com/photo-1.jpg',
					thumbnail: 'https://example.com/photo-1-thumb.jpg',
					caption: 'Fallback caption',
				},
				{
					photo: 'https://example.com/photo-2.jpg',
					thumbnail: 'https://example.com/photo-2-thumb.jpg',
					caption: 'Second fallback caption',
				},
			];
			const { container } = render(
				<Gallery photos={photoList} showThumbnails />,
			);

			expect(container.querySelector('img.photo')).toHaveAttribute(
				'alt',
				'Fallback caption',
			);
			expect(container.querySelector('img.thumbnail')).toHaveAttribute(
				'alt',
				'Fallback caption',
			);
		});

		it('uses explicit alt and thumbnailAlt values when provided', () => {
			const photoList = [
				{
					photo: 'https://example.com/photo-1.jpg',
					thumbnail: 'https://example.com/photo-1-thumb.jpg',
					caption: 'Caption fallback',
					alt: 'Main photo alt',
					thumbnailAlt: 'Thumbnail alt text',
				},
				{
					photo: 'https://example.com/photo-2.jpg',
					thumbnail: 'https://example.com/photo-2-thumb.jpg',
					caption: 'Second caption fallback',
				},
			];
			const { container } = render(
				<Gallery photos={photoList} showThumbnails />,
			);

			expect(container.querySelector('img.photo')).toHaveAttribute(
				'alt',
				'Main photo alt',
			);
			expect(container.querySelector('img.thumbnail')).toHaveAttribute(
				'alt',
				'Thumbnail alt text',
			);
		});

		it('renders gallery images as non-draggable by default', () => {
			const { container } = render(
				<Gallery photos={photos.slice(0, 1)} showThumbnails={false} />,
			);

			expect(container.querySelector('img.photo')).toHaveAttribute(
				'draggable',
				'false',
			);
		});

		it('does not coerce ReactNode captions into alt attributes', () => {
			const photoList = [
				{
					photo: 'https://example.com/photo-1.jpg',
					thumbnail: 'https://example.com/photo-1-thumb.jpg',
					caption: <span>Rich caption node</span>,
				},
				{
					photo: 'https://example.com/photo-2.jpg',
					thumbnail: 'https://example.com/photo-2-thumb.jpg',
					caption: 'Second caption',
				},
			];
			const { container } = render(
				<Gallery photos={photoList} showThumbnails />,
			);

			expect(container.querySelector('img.photo')).toHaveAttribute('alt', '');
			expect(container.querySelector('img.thumbnail')).toHaveAttribute(
				'alt',
				'',
			);
		});

		it('triggers next callback when swiping left on photo', () => {
			const nextButtonPressed = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					nextButtonPressed={nextButtonPressed}
				/>,
			);

			const photoButton = container.querySelector('.photo-button');
			expect(photoButton).toBeInTheDocument();

			fireEvent.touchStart(photoButton, {
				targetTouches: [{ screenX: 200 }],
			});
			fireEvent.touchMove(photoButton, {
				targetTouches: [{ screenX: 100 }],
			});
			fireEvent.touchEnd(photoButton);

			expect(nextButtonPressed).toHaveBeenCalledTimes(1);
		});

		it('triggers previous callback when swiping right on photo', () => {
			const prevButtonPressed = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					prevButtonPressed={prevButtonPressed}
				/>,
			);

			const photoButton = container.querySelector('.photo-button');
			expect(photoButton).toBeInTheDocument();

			fireEvent.touchStart(photoButton, {
				targetTouches: [{ screenX: 100 }],
			});
			fireEvent.touchMove(photoButton, {
				targetTouches: [{ screenX: 200 }],
			});
			fireEvent.touchEnd(photoButton);

			expect(prevButtonPressed).toHaveBeenCalledTimes(1);
		});

		it('fires activePhotoPressed when clicking on the active image', () => {
			const activePhotoPressed = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					activePhotoPressed={activePhotoPressed}
				/>,
			);

			const activeImage = container.querySelector('img.photo');
			expect(activeImage).toBeInTheDocument();

			fireEvent.click(activeImage);

			expect(activePhotoPressed).toHaveBeenCalledTimes(1);
		});

		it('renders custom caption actions from renderCaptionActions', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails
					renderCaptionActions={({ current }) => (
						<button type="button">Action {current + 1}</button>
					)}
				/>,
			);

			expect(container).toHaveTextContent('Action 1');
		});

		it('does not render zoom controls', () => {
			const { container } = render(
				<Gallery photos={photos.slice(0, 2)} showThumbnails={false} />,
			);

			expect(
				container.querySelector('button[aria-label="Zoom in"]'),
			).not.toBeInTheDocument();
		});

		it('renders custom internal components passed via components prop', () => {
			const CustomPrevButton = ({ onPress, disabled }) => (
				<button
					type="button"
					data-testid="custom-prev"
					onClick={onPress}
					disabled={disabled}
				>
					Prev
				</button>
			);
			const CustomNextButton = ({ onPress, disabled }) => (
				<button
					type="button"
					data-testid="custom-next"
					onClick={onPress}
					disabled={disabled}
				>
					Next
				</button>
			);
			const CustomPhoto = ({ photo, onPress }) => (
				<button type="button" data-testid="custom-photo" onClick={onPress}>
					{photo?.caption || 'photo'}
				</button>
			);
			const CustomCaption = () => (
				<figcaption data-testid="custom-caption">Custom caption</figcaption>
			);

			const { getByTestId } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails
					wrap
					components={{
						PrevButton: CustomPrevButton,
						NextButton: CustomNextButton,
						Photo: CustomPhoto,
						Caption: CustomCaption,
					}}
				/>,
			);

			expect(getByTestId('custom-prev')).toBeInTheDocument();
			expect(getByTestId('custom-next')).toBeInTheDocument();
			expect(getByTestId('custom-photo')).toBeInTheDocument();
			expect(getByTestId('custom-caption')).toBeInTheDocument();
		});

		it('applies classNames and styles to built-in gallery slots', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails
					wrap
					classNames={{
						gallery: 'custom-gallery',
						prevButton: 'custom-prev',
						nextButton: 'custom-next',
						photoButton: 'custom-photo-button',
						photoImage: 'custom-photo-image',
						caption: 'custom-caption',
						thumbnailsList: 'custom-thumbnails-list',
						thumbnailItem: 'custom-thumbnail-item',
						thumbnailButton: 'custom-thumbnail-button',
						thumbnailImage: 'custom-thumbnail-image',
						togglePhotoList: 'custom-toggle-photo-list',
					}}
					styles={{
						gallery: { outline: '1px solid rgb(255, 0, 0)' },
						prevButton: { opacity: 0.7 },
						photoButton: { outline: '2px solid rgb(0, 255, 0)' },
						caption: { backgroundColor: 'rgb(0, 0, 0)' },
					}}
				/>,
			);

			expect(container.querySelector('.gallery')).toHaveClass('custom-gallery');
			expect(container.querySelector('.gallery')).toHaveStyle({
				outline: '1px solid rgb(255, 0, 0)',
			});
			expect(container.querySelector('.gallery-control--prev')).toHaveClass(
				'custom-prev',
			);
			expect(container.querySelector('.gallery-control--next')).toHaveClass(
				'custom-next',
			);
			expect(container.querySelector('.photo-button')).toHaveClass(
				'custom-photo-button',
			);
			expect(container.querySelector('.gallery-photo-image')).toHaveClass(
				'custom-photo-image',
			);
			expect(container.querySelector('.gallery-figcaption')).toHaveClass(
				'custom-caption',
			);
			expect(container.querySelector('.gallery-thumbnails-list')).toHaveClass(
				'custom-thumbnails-list',
			);
			expect(container.querySelector('.gallery-thumbnail-item')).toHaveClass(
				'custom-thumbnail-item',
			);
			expect(container.querySelector('.gallery-thumbnail-button')).toHaveClass(
				'custom-thumbnail-button',
			);
			expect(container.querySelector('.gallery-thumbnail-image')).toHaveClass(
				'custom-thumbnail-image',
			);
			expect(
				container.querySelector('.gallery-thumbnails--toggle'),
			).toHaveClass('custom-toggle-photo-list');
		});

		it('applies motion customization classes and CSS variables', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					animations={{
						preset: 'fade',
						durationMs: 320,
						easing: 'linear',
						enableFeedback: false,
						feedbackScale: 0.94,
					}}
				/>,
			);

			const galleryRoot = container.querySelector('.gallery');
			expect(galleryRoot).toHaveClass('gallery--animation-fade');
			expect(galleryRoot).toHaveClass('gallery--feedback-disabled');
			expect(galleryRoot).toHaveStyle({
				'--rbg-motion-duration': '320ms',
				'--rbg-motion-easing': 'linear',
				'--rbg-feedback-scale': '0.94',
			});
		});

		it('renders outgoing and incoming photos together while transitioning', async () => {
			const photoList = photos.slice(0, 2);
			const { container, rerender } = render(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					activePhotoIndex={0}
					animations={{ preset: 'fade', durationMs: 40 }}
				/>,
			);

			expect(
				container.querySelector('.gallery-photo--outgoing'),
			).not.toBeInTheDocument();

			rerender(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					activePhotoIndex={1}
					animations={{ preset: 'fade', durationMs: 40 }}
				/>,
			);

			expect(
				container.querySelector('.gallery-photo--current'),
			).toBeInTheDocument();
			expect(
				container.querySelector('.gallery-photo--outgoing'),
			).toBeInTheDocument();

			const renderedSources = Array.from(
				container.querySelectorAll('.gallery-photo img'),
			).map((image) => image.getAttribute('src'));

			expect(renderedSources).toContain(photoList[0].photo);
			expect(renderedSources).toContain(photoList[1].photo);

			const currentImage = container.querySelector(
				'.gallery-photo--current img',
			);
			expect(currentImage).toBeInTheDocument();
			fireEvent.load(currentImage);

			await waitFor(() => {
				expect(
					container.querySelector('.gallery-photo--outgoing'),
				).not.toBeInTheDocument();
			});
		});

		it('does not keep an outgoing layer when image transitions are disabled', () => {
			const photoList = photos.slice(0, 2);
			const { container, rerender } = render(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					activePhotoIndex={0}
					animations={{ preset: 'none', durationMs: 40 }}
				/>,
			);

			rerender(
				<Gallery
					photos={photoList}
					showThumbnails={false}
					activePhotoIndex={1}
					animations={{ preset: 'none', durationMs: 40 }}
				/>,
			);

			expect(
				container.querySelector('.gallery-photo--outgoing'),
			).not.toBeInTheDocument();
		});

		it('does not keep an outgoing layer when reduced motion is preferred', () => {
			vi.stubGlobal('matchMedia', createMatchMediaMock(true));
			try {
				const photoList = photos.slice(0, 2);
				const { container, rerender } = render(
					<Gallery
						photos={photoList}
						showThumbnails={false}
						activePhotoIndex={0}
						animations={{ preset: 'fade', durationMs: 40 }}
					/>,
				);

				rerender(
					<Gallery
						photos={photoList}
						showThumbnails={false}
						activePhotoIndex={1}
						animations={{ preset: 'fade', durationMs: 40 }}
					/>,
				);

				expect(
					container.querySelector('.gallery-photo--outgoing'),
				).not.toBeInTheDocument();
			} finally {
				vi.unstubAllGlobals();
			}
		});

		it('applies cover fit adaptation to the active photo', () => {
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					imageFit="cover"
				/>,
			);

			expect(container.querySelector('.gallery')).toHaveClass(
				'gallery--image-fit-cover',
			);
			expect(container.querySelector('.gallery-photo-image')).toHaveClass(
				'gallery-photo-image--cover',
			);
		});

		it('enters zoom mode with mouse wheel and disables click navigation', () => {
			const activePhotoPressed = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					activePhotoPressed={activePhotoPressed}
				/>,
			);

			const photoButton = container.querySelector('.photo-button');
			const photoImage = container.querySelector('.gallery-photo-image');

			fireEvent.wheel(photoButton, {
				deltaY: -120,
				clientX: 120,
				clientY: 120,
			});
			fireEvent.click(photoImage);

			expect(activePhotoPressed).toHaveBeenCalledTimes(0);
		});

		it('ignores horizontal wheel gestures when deltaY is zero', () => {
			const { container } = render(
				<Gallery photos={photos.slice(0, 2)} showThumbnails={false} />,
			);

			const photoButton = container.querySelector('.photo-button');
			const photoImage = container.querySelector('.gallery-photo-image');

			fireEvent.wheel(photoButton, {
				deltaY: 0,
				deltaX: 120,
				clientX: 120,
				clientY: 120,
			});

			expect(photoImage.style.getPropertyValue('--rbg-zoom-scale')).toBe('1');
		});

		it('resets zoom state when enableZoom is toggled off', () => {
			const { container, rerender } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					enableZoom
				/>,
			);

			const photoButton = container.querySelector('.photo-button');
			const photoImage = container.querySelector('.gallery-photo-image');

			fireEvent.wheel(photoButton, {
				deltaY: -120,
				clientX: 120,
				clientY: 120,
			});

			expect(photoImage.style.getPropertyValue('--rbg-zoom-scale')).not.toBe(
				'1',
			);

			rerender(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					enableZoom={false}
				/>,
			);

			expect(photoImage.style.getPropertyValue('--rbg-zoom-scale')).toBe('1');
			expect(photoImage.style.getPropertyValue('--rbg-pan-x')).toBe('0px');
			expect(photoImage.style.getPropertyValue('--rbg-pan-y')).toBe('0px');
		});

		it('clamps horizontal pan for letterboxed images using rendered media bounds', () => {
			const { container } = render(
				<Gallery photos={photos.slice(0, 2)} showThumbnails={false} />,
			);

			const photoButton = container.querySelector('.photo-button');
			const photoImage = container.querySelector('.gallery-photo-image');

			Object.defineProperty(photoButton, 'clientWidth', {
				value: 1000,
				configurable: true,
			});
			Object.defineProperty(photoButton, 'clientHeight', {
				value: 500,
				configurable: true,
			});
			Object.defineProperty(photoImage, 'naturalWidth', {
				value: 600,
				configurable: true,
			});
			Object.defineProperty(photoImage, 'naturalHeight', {
				value: 1200,
				configurable: true,
			});

			fireEvent.wheel(photoButton, {
				deltaY: -120,
				clientX: 200,
				clientY: 200,
			});
			fireEvent.mouseDown(photoButton, { clientX: 100, clientY: 100 });
			fireEvent.mouseMove(photoButton, { clientX: 700, clientY: 100 });
			fireEvent.mouseUp(photoButton);

			expect(photoImage.style.getPropertyValue('--rbg-pan-x')).toBe('0px');
		});

		it('disables swipe navigation while zoomed in from pinch', () => {
			const nextButtonPressed = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 2)}
					showThumbnails={false}
					nextButtonPressed={nextButtonPressed}
				/>,
			);

			const photoButton = container.querySelector('.photo-button');
			fireEvent.touchStart(photoButton, {
				targetTouches: [
					{ clientX: 100, clientY: 100 },
					{ clientX: 180, clientY: 100 },
				],
			});
			fireEvent.touchMove(photoButton, {
				targetTouches: [
					{ clientX: 90, clientY: 100 },
					{ clientX: 210, clientY: 100 },
				],
			});
			fireEvent.touchEnd(photoButton);
			fireEvent.touchStart(photoButton, {
				targetTouches: [{ screenX: 200, clientX: 200, clientY: 200 }],
			});
			fireEvent.touchMove(photoButton, {
				targetTouches: [{ screenX: 100, clientX: 100, clientY: 200 }],
			});
			fireEvent.touchEnd(photoButton);

			expect(nextButtonPressed).toHaveBeenCalledTimes(0);
		});

		it('reports index changes for swipe navigation, including wrap transitions', async () => {
			const onActivePhotoIndexChange = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 3)}
					showThumbnails={false}
					wrap
					onActivePhotoIndexChange={onActivePhotoIndexChange}
				/>,
			);

			const photoButton = container.querySelector('.photo-button');
			expect(photoButton).toBeInTheDocument();

			onActivePhotoIndexChange.mockClear();

			const swipeLeft = () => {
				const currentPhotoButton = container.querySelector('.photo-button');
				fireEvent.touchStart(currentPhotoButton, {
					targetTouches: [{ screenX: 220 }],
				});
				fireEvent.touchMove(currentPhotoButton, {
					targetTouches: [{ screenX: 120 }],
				});
				fireEvent.touchEnd(currentPhotoButton);
			};
			const swipeRight = () => {
				const currentPhotoButton = container.querySelector('.photo-button');
				fireEvent.touchStart(currentPhotoButton, {
					targetTouches: [{ screenX: 120 }],
				});
				fireEvent.touchMove(currentPhotoButton, {
					targetTouches: [{ screenX: 220 }],
				});
				fireEvent.touchEnd(currentPhotoButton);
			};

			swipeLeft();
			swipeLeft();
			swipeLeft();
			swipeRight();

			await waitFor(() => {
				expect(onActivePhotoIndexChange).toHaveBeenCalledTimes(4);
			});
			expect(onActivePhotoIndexChange).toHaveBeenNthCalledWith(1, 1);
			expect(onActivePhotoIndexChange).toHaveBeenNthCalledWith(2, 2);
			expect(onActivePhotoIndexChange).toHaveBeenNthCalledWith(3, 0);
			expect(onActivePhotoIndexChange).toHaveBeenNthCalledWith(4, 2);
		});

		it('reports index changes when selecting a thumbnail', async () => {
			const onActivePhotoIndexChange = vi.fn();
			const { container } = render(
				<Gallery
					photos={photos.slice(0, 3)}
					showThumbnails
					onActivePhotoIndexChange={onActivePhotoIndexChange}
				/>,
			);

			const thumbnails = container.querySelectorAll(
				'.gallery-thumbnail-button',
			);
			expect(thumbnails).toHaveLength(3);

			onActivePhotoIndexChange.mockClear();
			fireEvent.click(thumbnails[2]);

			await waitFor(() => {
				expect(onActivePhotoIndexChange).toHaveBeenCalledWith(2);
			});
		});
	});
});
