import React from 'react';
import { shallow } from 'enzyme';

import Gallery from '../../src/components/Gallery';
import GalleryCaption from '../../src/components/GalleryCaption';

import photos from '../test-photos';

const requiredProps = {
  photos,
};

describe('Gallery', () => {
  describe('#render', () => {
    it('renders <GalleryCaption />', () => {
      const wrapper = shallow((
        <Gallery
          {...requiredProps}
          showThumbnails
        />
      ));
      expect(wrapper.find(GalleryCaption)).toHaveLength(1);
    });
    it('<GalleryCaption /> is not rendered if props.showThumbnails === false', () => {
      const wrapper = shallow((
        <Gallery
          {...requiredProps}
          showThumbnails={false}
        />
      ));
      expect(wrapper.find(GalleryCaption)).toHaveLength(0);
    });
  });
});
