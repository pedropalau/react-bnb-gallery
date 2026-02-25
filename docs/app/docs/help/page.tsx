import Link from 'next/link';

import DocsPage from '../../../components/docs-page';
import { createPageMetadata } from '../../../lib/metadata';

export const metadata = createPageMetadata('Help');

export default function HelpPage() {
  return (
    <DocsPage title="Help" path="help">
      <h3>Have a question?</h3>
      <p>
        Follow the <Link href="/docs/installation">installation</Link> guide to get up and running quickly. Please do not use
        GitHub issues for personal support requests.
      </p>
      <p>
        For personal contact, drop a line to <a href="mailto:pepalauisaac@gmail.com">pepalauisaac@gmail.com</a>.
      </p>

      <h3>Found a bug?</h3>
      <p>
        If you find a bug, read the{' '}
        <a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md">contribution guidelines</a>{' '}
        before you <a href="https://github.com/peterpalau/react-bnb-gallery/issues/new">report an issue</a>.
      </p>
    </DocsPage>
  );
}
