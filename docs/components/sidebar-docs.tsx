'use client';

import docsPages from '@/data/getDocsPages';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar';

export function SidebarDocs({ isOpen = false }: { isOpen?: boolean }) {
	return (
		<div
			className={cn(
				!isOpen && 'hidden',
				'fixed inset-0 z-90 -mb-16 mt-16 h-full w-full bg-white lg:static lg:-mb-0 lg:mt-0 lg:block lg:h-auto lg:w-1/3 lg:overflow-y-visible',
			)}
		>
			<Sidebar menu={docsPages} />
		</div>
	);
}

export default SidebarDocs;
