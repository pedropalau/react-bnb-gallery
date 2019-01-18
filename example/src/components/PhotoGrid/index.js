import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

import photos from './photos';

import './component.css';

const propTypes = {
  onPhotoPress: PropTypes.func
};

const defaultProps = {
  onPhotoPress: () => {}
};

class PhotoGrid extends PureComponent {
  renderColumns() {
    let columns = [];
    let index = 0;
    let current = 1;
    photos.forEach(photo => {
      if (!columns[index]) {
        columns[index] = [];
      }
      columns[index].push(
        this.renderPhoto(photo)
      );
      if (current < 3) {
        current++;
      }
      else {
        current = 1;
        index++;
      }
    });

    return columns;
  }

  renderPhoto(photo) {
    const { onPhotoPress } = this.props;

    return (
      <Image
        key={photo.src}
        onPress={onPhotoPress}
        {...photo}
      />
    );
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid">
          {this.renderColumns().map((column, index) => (
            <div key={`.column${index}`} className="column">
              {column}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

PhotoGrid.propTypes = propTypes;
PhotoGrid.defaultProps = defaultProps;

export default PhotoGrid;
