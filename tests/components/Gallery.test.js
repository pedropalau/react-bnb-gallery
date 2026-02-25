import { render } from '@testing-library/react';
import React from 'react';

import Gallery from '../../src/components/Gallery';

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
	});
});
