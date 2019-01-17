import React from 'react';

import Container from '../../components/Container';
import Text from '../../components/Text';

import withPrism from '../../utils/withPrism';

const GettingStarted = () => (
  <Container>
    <Text>You can install the <a href="https://www.npmjs.com/package/react-bnb-gallery" target="_blank" rel="noopener noreferrer">react-bnb-gallery</a> from <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a>.</Text>
    <pre style={{ textAlign: 'center' }} className="language-javascript">
      <code>
        npm install --save react-bnb-gallery
      </code>
    </pre>
    <Text>Following code is simplest usage:</Text>
    <pre className="language-javascript">
      <code>
      {`
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
      `}
      </code>
    </pre>
  </Container>
);

export default withPrism(GettingStarted);
