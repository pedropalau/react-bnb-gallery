'use client';

import type { ReactNode } from 'react';

import Layout from './layout';
import { useLayoutContext } from './layout-context';
import SidebarDocs from './sidebar-docs';

interface DocsPageProps {
	title: string;
	path: string;
	children: ReactNode;
}

function DocsContent({ title, path, children }: DocsPageProps) {
	const { navigationOpened } = useLayoutContext();

	return (
		<div className="container mx-auto max-w-screen-lg px-6 md:px-10">
			<div className="-mx-6 flex flex-col lg:flex-row">
				<SidebarDocs isOpen={navigationOpened} />
				<div className="w-full px-6 py-10 pt-24 md:px-8 lg:w-2/3 lg:px-0 lg:pt-28">
					<div className="mb-8 border-b border-gray-200 pb-8">
						<h1 className="flex items-center text-3xl font-semibold">
							{title}
						</h1>
					</div>
					<div className="prose">{children}</div>
					<footer className="mt-10 border-t border-gray-200 pt-4 md:mt-4 lg:mt-10 lg:pt-6">
						<div className="flex">
							<a
								className="text-green-500 underline"
								href={`https://github.com/peterpalau/react-bnb-gallery/tree/master/docs/app/docs/${path}/page.tsx`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Edit this page on GitHub
							</a>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default function DocsPage({ title, path, children }: DocsPageProps) {
	return (
		<Layout showHeaderFixed>
			<DocsContent title={title} path={path}>
				{children}
			</DocsContent>
		</Layout>
	);
}
