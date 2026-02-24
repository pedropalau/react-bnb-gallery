import React from 'react';
import { shallow } from 'enzyme';

import Gallery from '../../src/components/Gallery';
import Caption from '../../src/components/Caption';
import NextButton from '../../src/components/NextButton';

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

    it('renders preload photos', () => {
      const wrapper = shallow((
        <Gallery
          photos={photos.slice(0, 3)}
          preloadSize={2}
          showThumbnails={false}
        />
      ));

      expect(wrapper.find('.gallery-modal--preload img')).toHaveLength(2);
    });

    it('updates controls when photos prop changes', () => {
      const wrapper = shallow((
        <Gallery
          photos={photos.slice(0, 1)}
          showThumbnails={false}
        />
      ));

      expect(wrapper.find(NextButton)).toHaveLength(0);

      wrapper.setProps({ photos: photos.slice(0, 2) });

      expect(wrapper.find(NextButton)).toHaveLength(1);
    });
  });
});
