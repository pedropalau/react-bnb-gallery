import { CodeBlock } from '@/components/code-block';
import { CodeBlockCommand } from '@/components/code-block-command';
import {
	DocsPage,
	DocsPageHeading2,
	DocsPageParagraph,
} from '@/components/docs-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('Installation');

export default function InstallationPage() {
	return (
		<DocsPage
			title="Installation"
			description="Get started with react-bnb-gallery in minutes — install the package and drop it into your React project."
			path="installation"
		>
			<DocsPageHeading2>Quick Start</DocsPageHeading2>

			<DocsPageParagraph>
				Install react-bnb-gallery using your preferred package manager:
			</DocsPageParagraph>

			<CodeBlockCommand
				__npm__="npm install react-bnb-gallery"
				__pnpm__="pnpm add react-bnb-gallery"
				__yarn__="yarn add react-bnb-gallery"
			/>

			<DocsPageParagraph>
				To test the v3 prerelease, install the <code>next</code> tag:
			</DocsPageParagraph>

			<CodeBlockCommand
				__npm__="npm install react-bnb-gallery@next"
				__pnpm__="pnpm add react-bnb-gallery@next"
				__yarn__="yarn add react-bnb-gallery@next"
			/>

			<DocsPageParagraph>
				v3 removes deprecated default exports, so use named imports only. See the migration guide:{' '}
				<a
					href="https://github.com/pedropalau/react-bnb-gallery/blob/master/MIGRATION_v2_to_v3.md"
					target="_blank"
					rel="noreferrer"
				>
					MIGRATION_v2_to_v3.md
				</a>
				.
			</DocsPageParagraph>

			<DocsPageHeading2>Usage</DocsPageHeading2>

			<DocsPageParagraph>
				Import the stylesheet once in your app's entry point (e.g. <code>main.tsx</code> or <code>_app.tsx</code>):
			</DocsPageParagraph>

			<CodeBlock __raw__="import 'react-bnb-gallery/dist/style.css'">
				<code>import 'react-bnb-gallery/dist/style.css'</code>
			</CodeBlock>

			<DocsPageParagraph>
				Then render the gallery component. The example below shows the minimal setup needed to get it working:
			</DocsPageParagraph>

			<CodeBlock
				__raw__={`import { useState } from 'react';
import { ReactBnbGallery } from 'react-bnb-gallery';

const PHOTOS = [
  'https://images.unsplash.com/photo-1470238660368-09dd17cab0b5',
  'https://images.unsplash.com/photo-1565472604484-fd8b0414aaf3',
  'https://images.unsplash.com/photo-1594240094495-1b9177b5fefc',
];

function GalleryExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open gallery
      </button>
      <ReactBnbGallery
        show={open}
        photos={PHOTOS}
        onClose={() => setOpen(false)}
      />
    </>
  );
};`}
			>
				<pre>
					<code>{`import { useState } from 'react';
import { ReactBnbGallery } from 'react-bnb-gallery';

const PHOTOS = [
  'https://images.unsplash.com/photo-1470238660368-09dd17cab0b5',
  'https://images.unsplash.com/photo-1565472604484-fd8b0414aaf3',
  'https://images.unsplash.com/photo-1594240094495-1b9177b5fefc',
];

function GalleryExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open gallery
      </button>
      <ReactBnbGallery
        show={open}
        photos={PHOTOS}
        onClose={() => setOpen(false)}
      />
    </>
  );
};`}</code>
				</pre>
			</CodeBlock>
		</DocsPage>
	);
}
