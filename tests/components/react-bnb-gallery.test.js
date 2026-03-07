import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ReactBnbGallery } from '../../src/react-bnb-gallery';

import photos from '../test-photos';

vi.mock('focus-trap-react', () => ({
	default: ({ children }) => children,
	FocusTrap: ({ children }) => children,
}));

describe('ReactBnbGallery', () => {
	describe('#render', () => {
		it('unmounts', () => {
			const { rerender, unmount } = render(<ReactBnbGallery photos={photos} />);
			rerender(<ReactBnbGallery photos={photos} show />);
			expect(() => unmount()).not.toThrow();
		});
		it('renders <Gallery />', () => {
			render(<ReactBnbGallery photos={photos} show />);
			expect(document.body.querySelector('.gallery')).toBeInTheDocument();
		});

		it('invokes keyboard callbacks on arrow keys', () => {
			const leftKeyPressed = vi.fn();
			const rightKeyPressed = vi.fn();

			render(
				<ReactBnbGallery
					photos={photos}
					show
					leftKeyPressed={leftKeyPressed}
					rightKeyPressed={rightKeyPressed}
				/>,
			);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toBeInTheDocument();

			fireEvent.keyDown(modal, { key: 'ArrowLeft' });
			fireEvent.keyDown(modal, { key: 'ArrowRight' });

			expect(leftKeyPressed).toHaveBeenCalledTimes(1);
			expect(rightKeyPressed).toHaveBeenCalledTimes(1);
		});

		it('invokes onClose callback when escape key is pressed', () => {
			const onClose = vi.fn();

			render(<ReactBnbGallery photos={photos} show onClose={onClose} />);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toBeInTheDocument();

			fireEvent.keyDown(modal, { key: 'Escape' });

			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it('ignores keyboard navigation when event target is an input element', () => {
			const leftKeyPressed = vi.fn();

			render(
				<ReactBnbGallery
					photos={photos}
					show
					leftKeyPressed={leftKeyPressed}
				/>,
			);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toBeInTheDocument();

			const input = document.createElement('input');
			modal.appendChild(input);

			fireEvent.keyDown(input, { key: 'ArrowLeft' });

			expect(leftKeyPressed).not.toHaveBeenCalled();
		});

		it('renders dialog as modal for assistive tech', () => {
			render(<ReactBnbGallery photos={photos} show />);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toHaveAttribute('role', 'dialog');
			expect(modal).toHaveAttribute('aria-label', 'Photo gallery');
			expect(modal).toHaveAttribute('aria-modal', 'true');
		});

		it('uses localized dialog and close-button labels from phrases', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					phrases={{
						photoGallery: 'Galería de fotos',
						closeGallery: 'Cerrar galería',
					}}
				/>,
			);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toHaveAttribute('aria-label', 'Galería de fotos');
			expect(
				screen.getByRole('button', { name: 'Cerrar galería' }),
			).toBeInTheDocument();
		});

		it('applies light mode class to the modal', () => {
			render(<ReactBnbGallery photos={photos.slice(0, 2)} show light />);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toHaveClass('mode-light');
		});

		it('forwards animation and image-fit options to the gallery', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					animations={{ preset: 'zoom', durationMs: 260 }}
					imageFit="cover"
				/>,
			);

			expect(document.body.querySelector('.gallery')).toHaveClass(
				'gallery--animation-zoom',
			);
			expect(document.body.querySelector('.gallery-photo-image')).toHaveClass(
				'gallery-photo-image--cover',
			);
		});

		it('applies customizable modal open animation options', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					animations={{
						openPreset: 'zoom',
						openDurationMs: 360,
						openEasing: 'linear',
					}}
				/>,
			);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toHaveClass('gallery-modal--open-zoom');
			expect(modal).toHaveStyle({
				'--rbg-open-duration': '360ms',
				'--rbg-open-easing': 'linear',
			});
		});

		it('plays customizable close animation before unmounting', () => {
			vi.useFakeTimers();
			try {
				const closeAnimations = {
					closePreset: 'fade-down',
					closeDurationMs: 240,
					closeEasing: 'linear',
				};
				const { rerender } = render(
					<ReactBnbGallery
						photos={photos.slice(0, 2)}
						show
						animations={closeAnimations}
					/>,
				);

				rerender(
					<ReactBnbGallery
						photos={photos.slice(0, 2)}
						show={false}
						animations={closeAnimations}
					/>,
				);

				const closingModal = document.body.querySelector('.gallery-modal');
				expect(closingModal).toHaveClass('gallery-modal--close-fade-down');
				expect(closingModal).toHaveStyle({
					'--rbg-close-duration': '240ms',
					'--rbg-close-easing': 'linear',
				});

				act(() => {
					vi.advanceTimersByTime(239);
				});
				expect(
					document.body.querySelector('.gallery-modal'),
				).toBeInTheDocument();

				act(() => {
					vi.advanceTimersByTime(1);
				});
				expect(
					document.body.querySelector('.gallery-modal'),
				).not.toBeInTheDocument();
			} finally {
				vi.useRealTimers();
			}
		});

		it('sets overlay opacity via inline style', () => {
			render(<ReactBnbGallery photos={photos.slice(0, 2)} show light />);

			const overlay = document.body.querySelector('.gallery-modal--overlay');
			expect(overlay).toHaveStyle({ opacity: '1' });
		});

		it('renders counter above the image and updates it on navigation', () => {
			render(<ReactBnbGallery photos={photos.slice(0, 3)} show />);

			expect(
				document.body.querySelector('.gallery-photo-counter'),
			).toHaveTextContent('1 / 3');

			const modal = document.body.querySelector('.gallery-modal');
			fireEvent.keyDown(modal, { key: 'ArrowRight' });

			expect(
				document.body.querySelector('.gallery-photo-counter'),
			).toHaveTextContent('2 / 3');
		});

		it('supports placing the close button on the left side of the top bar', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					closeButtonPosition="left"
				/>,
			);

			expect(document.body.querySelector('.gallery-top')).toHaveClass(
				'gallery-top--close-left',
			);
			expect(
				document.body.querySelector(
					'.gallery-top-slot--start .gallery-modal--close',
				),
			).toBeInTheDocument();
			expect(
				document.body.querySelector(
					'.gallery-top-slot--end .gallery-modal--close',
				),
			).not.toBeInTheDocument();
		});

		it('supports placing navigation controls in a bottom row', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					controlsPlacement="bottom"
					wrap
				/>,
			);

			expect(document.body.querySelector('.gallery-main')).toHaveClass(
				'gallery-main--controls-bottom',
			);
			expect(
				document.body.querySelector(
					'.gallery-controls-row--bottom .gallery-control--prev',
				),
			).toBeInTheDocument();
			expect(
				document.body.querySelector(
					'.gallery-controls-row--bottom .gallery-control--next',
				),
			).toBeInTheDocument();
		});

		it('stops at the last photo when wrap is disabled', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 3)}
					show
					activePhotoIndex={2}
					wrap={false}
				/>,
			);

			const modal = document.body.querySelector('.gallery-modal');
			fireEvent.keyDown(modal, { key: 'ArrowRight' });

			expect(
				document.body.querySelector('.gallery-photo-counter'),
			).toHaveTextContent('3 / 3');
		});

		it('wraps from last photo to first when wrap is enabled', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 3)}
					show
					activePhotoIndex={2}
					wrap
				/>,
			);

			const modal = document.body.querySelector('.gallery-modal');
			fireEvent.keyDown(modal, { key: 'ArrowRight' });

			expect(
				document.body.querySelector('.gallery-photo-counter'),
			).toHaveTextContent('1 / 3');
		});

		it('supports partial phrase overrides and keeps default caption labels', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					phrases={{ noPhotosProvided: 'Sin fotos' }}
				/>,
			);

			expect(document.body).toHaveTextContent(
				/Hide photo list|Show photo list/,
			);
		});

		it('renders custom caption actions via renderCaptionActions', () => {
			const renderCaptionActions = vi.fn(({ current }) => (
				<button type="button">Custom {current + 1}</button>
			));

			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					renderCaptionActions={renderCaptionActions}
				/>,
			);

			expect(renderCaptionActions).toHaveBeenCalledWith(
				expect.objectContaining({
					current: 0,
					showThumbnails: true,
				}),
			);
			expect(document.body).toHaveTextContent('Custom 1');
		});

		it('supports overriding UI components via the components prop', () => {
			const onClose = vi.fn();
			const CustomCloseButton = ({ onPress }) => (
				<button type="button" data-testid="custom-close" onClick={onPress}>
					Close
				</button>
			);
			const CustomThumbnail = ({ number = 0, onPress }) => (
				<button
					type="button"
					data-testid={`custom-thumbnail-${number}`}
					data-photo-index={number}
					onClick={onPress}
				>
					Thumb {number + 1}
				</button>
			);

			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					onClose={onClose}
					components={{
						CloseButton: CustomCloseButton,
						Thumbnail: CustomThumbnail,
					}}
				/>,
			);

			fireEvent.click(screen.getByTestId('custom-close'));
			expect(onClose).toHaveBeenCalledTimes(1);

			expect(
				document.body.querySelector('.gallery-photo-counter'),
			).toHaveTextContent('1 / 2');
			fireEvent.click(screen.getByTestId('custom-thumbnail-1'));
			expect(
				document.body.querySelector('.gallery-photo-counter'),
			).toHaveTextContent('2 / 2');
		});

		it('applies classNames and styles overrides to modal slots', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					classNames={{
						modal: 'custom-modal',
						overlay: 'custom-overlay',
						closeButton: 'custom-close',
						photoCounter: 'custom-counter',
					}}
					styles={{
						modal: { outline: '2px solid rgb(255, 0, 0)' },
						overlay: { backdropFilter: 'blur(2px)' },
						closeButton: { borderRadius: '12px' },
						photoCounter: { letterSpacing: '0.2em' },
					}}
				/>,
			);

			expect(document.body.querySelector('.gallery-modal')).toHaveClass(
				'custom-modal',
			);
			expect(document.body.querySelector('.gallery-modal')).toHaveStyle({
				outline: '2px solid rgb(255, 0, 0)',
			});
			expect(
				document.body.querySelector('.gallery-modal--overlay'),
			).toHaveClass('custom-overlay');
			expect(
				document.body.querySelector('.gallery-modal--overlay'),
			).toHaveStyle({
				backdropFilter: 'blur(2px)',
			});
			expect(document.body.querySelector('.gallery-close')).toHaveClass(
				'custom-close',
			);
			expect(document.body.querySelector('.gallery-close')).toHaveStyle({
				borderRadius: '12px',
			});
			expect(document.body.querySelector('.gallery-photo-counter')).toHaveClass(
				'custom-counter',
			);
			expect(document.body.querySelector('.gallery-photo-counter')).toHaveStyle(
				{
					letterSpacing: '0.2em',
				},
			);
		});

		it('supports overriding overlay, photo counter, and modal container slots', () => {
			const CustomOverlay = ({ className, style }) => (
				<div
					data-testid="custom-overlay"
					className={className}
					style={style}
					aria-hidden="true"
				/>
			);
			const CustomPhotoCounter = ({ current, total, className }) => (
				<div data-testid="custom-counter" className={className}>
					{current} of {total}
				</div>
			);
			const CustomModalContainer = ({ children, className }) => (
				<section data-testid="custom-modal-container" className={className}>
					{children}
				</section>
			);

			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					components={{
						Overlay: CustomOverlay,
						PhotoCounter: CustomPhotoCounter,
						ModalContainer: CustomModalContainer,
					}}
				/>,
			);

			expect(screen.getByTestId('custom-overlay')).toBeInTheDocument();
			expect(screen.getByTestId('custom-modal-container')).toBeInTheDocument();
			expect(screen.getByTestId('custom-counter')).toHaveTextContent('1 of 2');

			const modal = document.body.querySelector('.gallery-modal');
			fireEvent.keyDown(modal, { key: 'ArrowRight' });
			expect(screen.getByTestId('custom-counter')).toHaveTextContent('2 of 2');
		});
	});
});
