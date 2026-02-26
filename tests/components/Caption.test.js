import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Caption from '../../src/components/caption';
import { calculateThumbnailsLeftScroll } from '../../src/utils/thumbnail-layout';

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

		it('keeps photo-list toggle visible after collapsing thumbnails', () => {
			render(
				<Caption current={0} photos={photos.slice(0, 2)} showThumbnails />,
			);

			const hideToggle = screen.getByRole('button', {
				name: /hide photo list/i,
			});
			fireEvent.click(hideToggle);

			expect(
				screen.getByRole('button', { name: /show photo list/i }),
			).toBeInTheDocument();
		});

		it('syncs thumbnail list position on initial non-zero current index', async () => {
			const current = 5;
			const galleryPhotos = photos.slice(0, 8);
			const { container } = render(
				<Caption current={current} photos={galleryPhotos} showThumbnails />,
			);
			const thumbnailsWrapper = container.querySelector(
				'.gallery-figcaption--thumbnails',
			);
			const expectedMarginLeft = `${calculateThumbnailsLeftScroll(
				current,
				galleryPhotos.length,
				thumbnailsWrapper.getBoundingClientRect(),
			)}px`;

			await waitFor(() => {
				expect(container.querySelector('.thumbnails-list')).toHaveStyle({
					marginLeft: expectedMarginLeft,
				});
			});
		});

		it('renders caption and subcaption when they are React nodes', () => {
			render(
				<Caption
					current={0}
					photos={[
						{
							photo: 'https://example.com/photo.jpg',
							caption: (
								<span>
									Mountain sunrise by{' '}
									<a href="https://example.com/jane-doe">Jane Doe</a>
								</span>
							),
							subcaption: (
								<span>
									Photo by <strong>Jane Doe</strong>
								</span>
							),
						},
					]}
				/>,
			);

			expect(
				screen.getByRole('link', { name: 'Jane Doe' }),
			).toBeInTheDocument();
			expect(screen.getByText('Photo by')).toBeInTheDocument();
		});
	});
});
