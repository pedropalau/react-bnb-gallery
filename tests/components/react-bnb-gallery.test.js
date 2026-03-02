import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import ReactBnbGallery from '../../src/react-bnb-gallery';

import photos from '../test-photos';

vi.mock('focus-trap-react', () => ({
	default: ({ children }) => children,
	FocusTrap: ({ children }) => children,
}));

describe('ReactBnbGallery', () => {
	let warnSpy;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

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
			expect(modal).toHaveAttribute('aria-modal', 'true');
		});

		it('applies light mode class to the modal', () => {
			render(<ReactBnbGallery photos={photos.slice(0, 2)} show light />);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toHaveClass('mode-light');
		});

		it('sets overlay opacity via inline style', () => {
			render(<ReactBnbGallery photos={photos.slice(0, 2)} show light />);

			const overlay = document.body.querySelector('.gallery-modal--overlay');
			expect(overlay).toHaveStyle({ opacity: '1' });
		});

		it('ignores deprecated backgroundColor prop at runtime', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					backgroundColor="rgb(240, 240, 240)"
				/>,
			);

			const overlay = document.body.querySelector('.gallery-modal--overlay');
			expect(overlay.style.backgroundColor).toBe('');
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

		it('warns when photos is passed as a single string', () => {
			render(<ReactBnbGallery photos="https://example.com/photo.jpg" show />);

			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					'Deprecation: passing `photos` as a single string/object is deprecated',
				),
			);
		});

		it('warns when deprecated direction prop is used', () => {
			render(<ReactBnbGallery photos={photos} show direction="backwards" />);

			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining('Deprecation: `direction` is deprecated'),
			);
		});

		it('warns when deprecated backgroundColor prop is used', () => {
			render(
				<ReactBnbGallery
					photos={photos.slice(0, 2)}
					show
					backgroundColor="rgb(240, 240, 240)"
				/>,
			);

			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining('Deprecation: `backgroundColor` is deprecated'),
			);
		});
	});
});
