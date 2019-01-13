import React, { Component, Fragment } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import {
  PhotoGrid,
  Button,
  Container,
  GithubButton,
  Text,
  Title
} from './components';

import PHOTOS from './photos';

const buttonCustomStyle = {
  display: 'inline-block',
  marginTop: '16px',
  marginBottom: '24px',
};

export default class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      galleryOpened: false
    };
  }

  toggleGallery = () => this.setState(prevState => ({
    galleryOpened: !prevState.galleryOpened,
  }));

  render () {
    return (
      <Fragment>
        <GithubButton url="https://github.com/peterpalau/react-bnb-gallery" />
        <Container className="container">
          <Title>React photo gallery</Title>
          <Text>Friendly, customizable and accessible-ready simple photo gallery based on React.</Text>
          <Container className="actions">
            <Button
              onPress={this.toggleGallery}
              customStyle={buttonCustomStyle}
              secondary
              large>
              View photo gallery
            </Button>
          </Container>
          <ReactBnbGallery
            show={this.state.galleryOpened}
            photos={PHOTOS}
            onClose={this.toggleGallery}
            wrap />
        </Container>
        <PhotoGrid />
      </Fragment>
    )
  }
}
