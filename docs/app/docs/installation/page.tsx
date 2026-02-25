import DocsPage from '../../../components/docs-page';
import { createPageMetadata } from '../../../lib/metadata';

export const metadata = createPageMetadata('Installation');

export default function InstallationPage() {
	return (
		<DocsPage title="Installation" path="installation">
			<div className="heading mt-0">
				<h3 className="m-0 flex items-center text-2xl">
					<span className="mr-3 mt-px inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-base text-gray-700">
						1
					</span>
					Install the library
				</h3>
			</div>
			<p>
				You can install{' '}
				<a href="https://www.npmjs.com/package/react-bnb-gallery">
					react-bnb-gallery
				</a>{' '}
				from <a href="https://www.npmjs.com/">npm</a>.
			</p>
			<pre>
				<code>{`# Using npm
npm install react-bnb-gallery

# Using Yarn
yarn add react-bnb-gallery`}</code>
			</pre>

			<div className="heading mt-0">
				<h3 className="m-0 flex items-center text-2xl">
					<span className="mr-3 mt-px inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-base text-gray-700">
						2
					</span>
					Import compiled CSS
				</h3>
			</div>
			<p>
				Alternatively, you may use the library CSS by simply adding this line to
				your project&apos;s entry point:
			</p>
			<pre>
				<code>import &apos;react-bnb-gallery/dist/style.css&apos;</code>
			</pre>

			<div className="heading mt-0">
				<h3 className="m-0 flex items-center text-2xl">
					<span className="mr-3 mt-px inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-base text-gray-700">
						3
					</span>
					Start using the library
				</h3>
			</div>
			<p>Following code is simplest usage:</p>
			<pre>
				<code>{`import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

const PHOTOS = [
  'https://images.unsplash.com/photo-1470238660368-09dd17cab0b5',
  'https://images.unsplash.com/photo-1565472604484-fd8b0414aaf3',
  'https://images.unsplash.com/photo-1594240094495-1b9177b5fefc',
];

const GalleryExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open gallery
      </button>
      <ReactBnbGallery
        show={isOpen}
        photos={PHOTOS}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};`}</code>
			</pre>
		</DocsPage>
	);
}
