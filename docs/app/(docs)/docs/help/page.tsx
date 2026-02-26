import Link from 'next/link';

import {
	DocsPage,
	DocsPageAnchor,
	DocsPageHeading2,
	DocsPageParagraph,
} from '@/components/docs-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('Help');

export default function HelpPage() {
	return (
		<DocsPage
			title="Help"
			description="Find answers to common questions or get support from the community."
			path="help"
		>
			<DocsPageHeading2>Have a question?</DocsPageHeading2>

			<DocsPageParagraph>
				Follow the <Link href="/docs/installation">installation</Link> guide to
				get up and running quickly. Please do not use GitHub issues for personal
				support requests.
			</DocsPageParagraph>

			<DocsPageParagraph>
				For personal contact, drop a line to{' '}
				<DocsPageAnchor href="mailto:pepalauisaac@gmail.com">
					pepalauisaac@gmail.com
				</DocsPageAnchor>
				.
			</DocsPageParagraph>

			<DocsPageHeading2>Found a bug?</DocsPageHeading2>

			<DocsPageParagraph>
				If you find a bug, read the{' '}
				<DocsPageAnchor href="https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md">
					contribution guidelines
				</DocsPageAnchor>{' '}
				before you{' '}
				<DocsPageAnchor href="https://github.com/peterpalau/react-bnb-gallery/issues/new">
					report an issue
				</DocsPageAnchor>
				.
			</DocsPageParagraph>
		</DocsPage>
	);
}
