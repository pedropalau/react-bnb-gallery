import React from 'react';

import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Text from '../../components/Text';

const License = () => (
  <Container className="container" style={{ textAlign: 'left' }}>
    <Heading>License</Heading>
    <Text><strong>react-bnb-gallery</strong> is free to use for personal and commercial projects under <a href="https://github.com/peterpalau/react-bnb-gallery/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">the MIT license</a>.</Text>
    <Text>Attribution is not required, but greatly appreciated. It does not have to be user-facing and can remain within the code.</Text>
  </Container>
);

export default License;
