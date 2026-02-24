import React from 'react';
import { shallow } from 'enzyme';

import Caption from '../../src/components/Caption';
import TogglePhotoList from '../../src/components/TogglePhotoList';

import photos from '../test-photos';

describe('Caption', () => {
  describe('#render', () => {
    it('updates thumbnail controls when photos prop changes', () => {
      const wrapper = shallow((
        <Caption
          current={0}
          photos={photos.slice(0, 1)}
        />
      ));

      expect(wrapper.find(TogglePhotoList)).toHaveLength(0);

      wrapper.setProps({ photos: photos.slice(0, 2) });

      expect(wrapper.find(TogglePhotoList)).toHaveLength(1);
    });
  });
});
