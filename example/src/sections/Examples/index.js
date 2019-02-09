import React, { PureComponent, Fragment } from 'react';

import ReactBnbGallery from 'react-bnb-gallery';

import Button from '../../components/Button';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Title from '../../components/Title';
import Rule from '../../components/Rule';
import Spacing from '../../components/Spacing';

import { DEMOS } from './constants';

import withPrism from '../../utils/withPrism';

import './section.css';

class Examples extends PureComponent {
  constructor() {
    super();
    this.state = {
      galleryOpened: false,
      galleryProps: {},
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
  }

  onButtonPress(config = {}) {
    this.setState({
      galleryOpened: true,
      galleryProps: config,
    });
  }

  closeGallery() {
    this.setState({
      galleryOpened: false,
      galleryProps: {},
    });
  }

  render() {
    const {
      galleryOpened,
      galleryProps,
    } = this.state;

    return (
      <Fragment>
        <Container className="content demos-container">
          <Text>All these examples can be found in the <code>demos</code> folder of the repository.</Text>
          <Container className="demos">
            {DEMOS.map(demostration => (
              <Container className="demo" key={`.${demostration.name}`}>
                <Title level={6}>
                  {demostration.label}
                </Title>
                <div className="demo-code">
                  <pre className="language-javascript">
                    <code>
                      {demostration.code}
                    </code>
                  </pre>
                </div>
                <div className="demo-actions">
                  <Button
                    onPress={() => this.onButtonPress(demostration.config)}
                    outline
                    small
                  >
                    Run example
                  </Button>
                </div>
              </Container>
            ))}
          </Container>
          <Container style={{ textAlign: 'center' }}>
            <Spacing top={4}>
              <Rule />
            </Spacing>
            <Text>Images from <a href="https://awards.unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash Awards 2018</a></Text>
          </Container>
        </Container>
        <ReactBnbGallery
          show={galleryOpened}
          onClose={this.closeGallery}
          {...galleryProps}
        />
      </Fragment>
    );
  }
}

export default withPrism(Examples);
