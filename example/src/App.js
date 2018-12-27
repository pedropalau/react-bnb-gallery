import React, { Component } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import PHOTOS from './photos';

export default class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      galleryOpened: true
    };
  }

  toggleGallery = () => this.setState(prevState => ({
    galleryOpened: !prevState.galleryOpened,
  }));

  render () {
    return (
      <div className="container">
        <h2 className="title">React simple gallery</h2>
        <p className="description">This is an example of a simple photo gallery, inspired by the Airbnb photo gallery.</p>
        <div className="action">
          <button className="button" onClick={this.toggleGallery}>
            Show photos
          </button>
        </div>
        <ReactBnbGallery
          show={this.state.galleryOpened}
          photos={PHOTOS}
          onClose={this.toggleGallery}
        />
      </div>
    )
  }
}
