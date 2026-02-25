import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import ReactBnbGallery from '../../src/ReactBnbGallery';

import photos from '../test-photos';

vi.mock('focus-trap-react', () => ({
	default: ({ children }) => children,
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

		it('renders dialog as modal for assistive tech', () => {
			render(<ReactBnbGallery photos={photos} show />);

			const modal = document.body.querySelector('.gallery-modal');
			expect(modal).toHaveAttribute('role', 'dialog');
			expect(modal).toHaveAttribute('aria-modal', 'true');
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
