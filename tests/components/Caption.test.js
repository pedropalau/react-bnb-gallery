import { render } from '@testing-library/react';

import Caption from '../../src/components/Caption';

import photos from '../test-photos';

describe('Caption', () => {
	describe('#render', () => {
		it('updates thumbnail controls when photos prop changes', () => {
			const { container, rerender } = render(
				<Caption current={0} photos={photos.slice(0, 1)} />,
			);

			expect(
				container.querySelector('.gallery-thumbnails--toggle'),
			).not.toBeInTheDocument();

			rerender(<Caption current={0} photos={photos.slice(0, 2)} />);

			expect(
				container.querySelector('.gallery-thumbnails--toggle'),
			).toBeInTheDocument();
		});

		it('syncs showThumbnails state when showThumbnails prop changes', () => {
			const { container, rerender } = render(
				<Caption current={0} photos={photos.slice(0, 2)} showThumbnails />,
			);

			expect(
				container.querySelector('figcaption.hide'),
			).not.toBeInTheDocument();

			rerender(
				<Caption
					current={0}
					photos={photos.slice(0, 2)}
					showThumbnails={false}
				/>,
			);

			expect(container.querySelector('figcaption.hide')).toBeInTheDocument();
		});
	});
});
