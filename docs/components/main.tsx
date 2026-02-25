import type { ReactNode } from 'react';

export function Main({ children }: { children: ReactNode }) {
	return (
		<div className="flex-1" role="main">
			{children}
		</div>
	);
}

export default Main;
