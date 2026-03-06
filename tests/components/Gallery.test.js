import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';

import { Gallery } from '../../src/components/gallery';

import photos from '../test-photos';

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

		it('does not render zoom controls', () => {
			const { container } = render(
				<Gallery photos={photos.slice(0, 2)} showThumbnails={false} />,
			);

			expect(
				container.querySelector('button[aria-label="Zoom in"]'),
			).not.toBeInTheDocument();
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
	});
});
