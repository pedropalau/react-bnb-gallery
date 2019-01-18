import React, { Component, Fragment } from 'react';

import ReactBnbGallery from 'react-bnb-gallery';

import sections from './sections';

import {
  Button,
  Container,
  GithubButton,
  Text,
  Title,
  Section,
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
    const { galleryOpened } = this.state;

    return (
      <Fragment>
        <GithubButton url="https://github.com/peterpalau/react-bnb-gallery" />
        <div role="main">
          <Container className="container intro">
            <Title level={1}>React photo gallery</Title>
            <Text>Friendly, customizable and accessible-ready simple photo gallery based on <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>.</Text>
            <Container className="actions">
              <Button
                onPress={this.toggleGallery}
                customStyle={buttonCustomStyle}
                secondary
                large>
                View photo gallery
              </Button>
            </Container>
          </Container>
          {sections.map(section => (
            <Section key={section.id} title={section.title}>
              {section.getComponent()}
            </Section>
          ))}
        </div>
        <ReactBnbGallery
          show={galleryOpened}
          photos={PHOTOS}
          onClose={this.toggleGallery}
          wrap
        />
      </Fragment>
    )
  }
}
