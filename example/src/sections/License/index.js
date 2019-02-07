import React from 'react';

import Container from '../../components/Container';
import Text from '../../components/Text';

const License = () => (
  <Container className="container" style={{ textAlign: 'left' }}>
    <Text inherit><strong>React Photo Gallery</strong> is free to use for personal and commercial projects under <a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">the MIT license</a>.</Text>
    <Text inherit>Attribution is not required, but greatly appreciated. It does not have to be user-facing and can remain within the code.</Text>
  </Container>
);

export default License;
