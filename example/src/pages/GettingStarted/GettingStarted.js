import React from 'react';

import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Text from '../../components/Text';

import withPrism from '../../utils/withPrism';

const installCode = `
  /* If you are using NPM */
  npm install --save react-bnb-gallery

  /* If you are using Yarn */
  yarn add react-bnb-gallery
`;

const usageCode = `
  import React, { Component } from 'react';
  import ReactBnbGallery from 'react-bnb-gallery';

  const photos = [...];

  class Example extends Component {
    constructor() {
      super(...arguments);
      this.state = {
        galleryOpened: false
      };
      this.toggleGallery = this.toggleGallery.bind(this);
    }

    toggleGallery() {
      this.setState(prevState => ({
        galleryOpened: !prevState.galleryOpened
      }));
    }

    render () {
      return (
        <button onClick={this.toggleGallery}>
          Open gallery
        </button>
        <ReactBnbGallery
          show={this.state.galleryOpened}
          photos={photos}
          onClose={this.toggleGallery}
        />
      )
    }
  }
`;

const GettingStarted = () => (
  <Container className="container">
    <Heading>Getting Started</Heading>
    <Text>You can install <a href="https://www.npmjs.com/package/react-bnb-gallery" target="_blank" rel="noopener noreferrer">react-bnb-gallery</a> from <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a>.</Text>
    <pre className="language-javascript">
      <code className="language-javascript">
        {installCode}
      </code>
    </pre>
    <Text>Following code is simplest usage:</Text>
    <pre className="language-javascript">
      <code className="language-javascript">
        {usageCode}
      </code>
    </pre>
  </Container>
);

export default withPrism(GettingStarted);
