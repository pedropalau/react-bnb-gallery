import { render, screen } from '@testing-library/react';
import { CloseButton } from '../../src/components/close-button';

describe('CloseButton', () => {
	it('renders accessible icon markup without busy state', () => {
		render(<CloseButton />);

		const button = screen.getByRole('button', { name: 'Close gallery' });
		const icon = button.querySelector('svg.gallery-close-icon');

		expect(button).not.toHaveAttribute('aria-busy');
		expect(icon).toHaveAttribute('aria-hidden', 'true');
		expect(icon).not.toHaveAttribute('role', 'img');
		expect(icon).not.toHaveStyle({ display: 'block' });
	});

	it('applies light class when light prop is true', () => {
		render(<CloseButton light />);

		expect(screen.getByRole('button', { name: 'Close gallery' })).toHaveClass(
			'gallery-close--light',
		);
	});

	it('uses localized close label from phrases', () => {
		render(<CloseButton phrases={{ closeGallery: 'Cerrar galería' }} />);

		expect(
			screen.getByRole('button', { name: 'Cerrar galería' }),
		).toBeInTheDocument();
	});
});
