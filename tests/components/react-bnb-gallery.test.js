import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { INVERSE_COLOR } from '../../src/constants';
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

		it('forwards light mode to gallery controls', () => {
			render(<ReactBnbGallery photos={photos.slice(0, 2)} show light />);

			const nextControlIcon = document.body.querySelector(
				'.gallery-control--next svg',
			);
			expect(nextControlIcon).toHaveStyle({ fill: INVERSE_COLOR });
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
	});
});
