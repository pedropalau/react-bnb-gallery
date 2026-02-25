import DocsPage from '@/components/docs-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('License');

export default function LicensePage() {
	return (
		<DocsPage title="License" path="license">
			<p>
				<strong>BnbGallery</strong> is free to use for personal and commercial
				projects under the{' '}
				<a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/LICENSE">
					MIT license
				</a>
				.
			</p>
			<p>Attribution is not required, but greatly appreciated.</p>
			<p>It does not have to be user-facing and can remain within the code.</p>
			<pre>
				<code>{`The MIT License (MIT)

Copyright (c) Pedro Enrique Palau <pepalauisaac@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}</code>
			</pre>
		</DocsPage>
	);
}
