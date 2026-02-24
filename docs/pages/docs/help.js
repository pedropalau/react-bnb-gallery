import React from 'react';

import DocsPage from '../../components/DocsPage';

const Help = () => (
  <DocsPage title="Help" path="docs/help.js">
    <h3>Have a question?</h3>
    <p>
      Follow the <a href="/docs/installation">installation</a> guide to get up and running quickly.
      Please do not use GitHub issues for personal support requests.
    </p>
    <p>
      For personal contact, drop a line to <a href="mailto:pepalauisaac@gmail.com">pepalauisaac@gmail.com</a>.
    </p>

    <h3>Found a bug?</h3>
    <p>
      If you find a bug, read the{' '}
      <a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md">
        contribution guidelines
      </a>{' '}
      before you{' '}
      <a href="https://github.com/peterpalau/react-bnb-gallery/issues/new">
        report an issue
      </a>.
    </p>
  </DocsPage>
);

export default Help;
