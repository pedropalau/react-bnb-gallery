import React, { useState, useCallback, useMemo } from 'react';

import ReactBnbGallery from 'react-bnb-gallery';

import {
  Button,
  Container,
  Spacing,
  Text,
  Title,
  PhotoGrid,
} from '../../components';
import Image from '../../components/Image';

import PHOTOS from '../../photos';

const buttonCustomStyle = {
  marginTop: '16px',
  marginBottom: '24px',
};

const Home = () => {
  const [galleryStatus, setGalleryStatus] = useState({
    isOpen: false,
    currentPhoto: null,
  });

  const onPhotoPress = useCallback((url) => {
    setGalleryStatus({
      isOpen: true,
      currentPhoto: url,
    });
  }, []);

  const onGalleryClose = useCallback(() => {
    setGalleryStatus({
      isOpen: false,
      currentPhoto: null,
    });
  }, []);

  const isOpen = galleryStatus.isOpen;

  const transformPhotos = useMemo(() => {
    return PHOTOS.map((photo) => {
      return {
        ...photo,
        component: Image,
      };
    });
  }, []);

  const photosToShow = galleryStatus.currentPhoto || transformPhotos;

  return (
    <>
      <Container id="start" className="container intro">
        <Title level={1}>React photo gallery</Title>
        <Text inherit>
          Friendly, customizable and accessible-ready simple photo gallery based
          on{' '}
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          .
        </Text>
        <Container className="actions">
          <Spacing right={2}>
            <Button
              onPress={() =>
                setGalleryStatus({
                  isOpen: true,
                  currentPhoto: null,
                })
              }
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
      <PhotoGrid onPhotoPress={onPhotoPress} />
      <ReactBnbGallery
        show={isOpen}
        photos={photosToShow}
        onClose={onGalleryClose}
        wrap={false}
        backgroundColor="#000000"
      />
    </>
  );
};

export default Home;
