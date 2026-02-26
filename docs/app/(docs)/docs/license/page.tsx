import { CodeBlock } from '@/components/code-block';
import {
	DocsPage,
	DocsPageAnchor,
	DocsPageParagraph,
} from '@/components/docs-page';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('License');

const LICENSE = `The MIT License (MIT)

Copyright (c) Pedro Palau <palauisaac@gmail.com>

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
SOFTWARE.`;

export default function LicensePage() {
	return (
		<DocsPage
			title="License"
			description="react-bnb-gallery is open source software released under the MIT license."
			path="license"
		>
			<DocsPageParagraph>
				<strong>react-bnb-gallery</strong> is{' '}
				<DocsPageAnchor href="https://github.com/pedropalau/react-bnb-gallery/blob/master/LICENSE">
					MIT-licensed
				</DocsPageAnchor>{' '}
				and free to use in any project — personal or commercial.
			</DocsPageParagraph>

			<DocsPageParagraph>
				Attribution is not required, but greatly appreciated — even a comment
				in your code mentioning the library is enough.
			</DocsPageParagraph>

			<CodeBlock __raw__={LICENSE}>
				<pre className="">
					<code>{LICENSE}</code>
				</pre>
			</CodeBlock>
		</DocsPage>
	);
}
