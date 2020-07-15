import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

import photos from './photos';

const propTypes = {
  photosPerColumn: PropTypes.number,
  onPhotoPress: PropTypes.func,
};

const defaultProps = {
  photosPerColumn: 3,
  onPhotoPress: () => {},
};

class PhotoGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.getColumnWidth();
  }

  getColumnWidth() {
    const { photosPerColumn } = this.props;
    this.columnWidth = photos.length / photosPerColumn;
  }

  renderColumns() {
    let columns = {};
    let index = 0;
    let current = 1;

    photos.forEach((photo) => {
      if (!columns[index]) {
        columns = {
          ...columns,
          [index]: [],
        };
      }

      columns = {
        ...columns,
        [index]: [
          ...columns[index],
          this.renderPhoto(photo),
        ],
      };

      if (current < 3) {
        current += 1;
      } else {
        current = 1;
        index += 1;
      }
    });

    return columns;
  }

  renderPhoto({
    src,
    width,
    height,
  }) {
    const {
      onPhotoPress,
    } = this.props;

    return (
      <Image
        key={src}
        onPress={onPhotoPress}
        columnSize={this.columnWidth}
        src={src}
        width={width}
        height={height}
      />
    );
  }

  render() {
    const columns = this.renderColumns();

    return (
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-px">
          {Object.keys(columns).map((i) => (
            <div key={`.column${i}`} className="flex flex-col space-y-px">
              {columns[i]}
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
