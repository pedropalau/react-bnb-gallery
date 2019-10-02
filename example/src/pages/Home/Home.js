import React, { Component } from 'react';

import { ReactBnbGallery, Gallery } from 'react-bnb-gallery';

import {
  Button,
  Container,
  Spacing,
  Text,
  Title,
  PhotoGrid,
} from '../../components';

import PHOTOS from '../../photos';

import 'react-bnb-gallery/dist/index.css';

const buttonCustomStyle = {
  marginTop: '16px',
  marginBottom: '24px',
};

class Home extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      openGallery: false,
      currentPhotos: null,
    };
    this.closeGallery = this.closeGallery.bind(this);
    this.onPhotoPress = this.onPhotoPress.bind(this);
    this.toggleGallery = this.toggleGallery.bind(this);
  }

  closeGallery() {
    this.setState({
      openGallery: false,
      currentPhotos: null,
    });
  }

  onPhotoPress(url) {
    this.setState({
      openGallery: true,
      currentPhotos: [url],
    });
  }

  toggleGallery() {
    this.setState(prevState => ({
      openGallery: !prevState.galleryOpened,
    }));
  }

  render() {
    const {
      openGallery,
      currentPhotos,
    } = this.state;

    const photosToShow = currentPhotos || PHOTOS;

    return (
      <>
        <Container id="start" className="container intro">
          <Title level={1}>React photo gallery</Title>
          <Text inherit>Friendly, customizable and accessible-ready simple photo gallery based on <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>.</Text>
          <Container className="actions">
            <Spacing right={2}>
              <Button
                onPress={this.toggleGallery}
                customStyle={buttonCustomStyle}
                primary
                large
              >
                View demo gallery
              </Button>
            </Spacing>
            <Spacing left={2}>
              <Button
                customStyle={buttonCustomStyle}
                url="https://github.com/peterpalau/react-bnb-gallery"
                secondary
                outline
                large
              >
                Fork this repository
              </Button>
            </Spacing>
          </Container>
        </Container>
        <Gallery
          photos={photosToShow}
        />
        <PhotoGrid onPhotoPress={this.onPhotoPress} />
        <ReactBnbGallery
          show={openGallery}
          photos={photosToShow}
          onClose={this.closeGallery}
          wrap={false}
          backgroundColor='#000000'
        />
      </>
    );
  }
}

export default Home;
