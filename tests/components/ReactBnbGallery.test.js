import { render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import ReactBnbGallery from '../../src/ReactBnbGallery';

import photos from '../test-photos';

vi.mock('focus-trap-react', () => ({
	default: ({ children }) => children,
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
	});
});
