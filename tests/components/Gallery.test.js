import React from 'react';
import { shallow } from 'enzyme';

import Gallery from '../../src/components/Gallery';
import Caption from '../../src/components/Caption';

import photos from '../test-photos';

describe('Gallery', () => {
  describe('#render', () => {
    it('renders <Caption />', () => {
      const wrapper = shallow((
        <Gallery
          photos={photos}
          showThumbnails
        />
      ));
      expect(wrapper.find(Caption)).toHaveLength(1);
    });
    it('<Caption /> is not rendered if props.showThumbnails === false', () => {
      const wrapper = shallow((
        <Gallery
          photos={photos}
          showThumbnails={false}
        />
      ));
      expect(wrapper.find(Caption)).toHaveLength(0);
    });
  });
});
