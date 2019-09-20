import React from 'react';
import { shallow, mount } from 'enzyme';

import ReactBnbGallery from '../../src/ReactBnbGallery';
import Gallery from '../../src/components/Gallery';

import photos from '../test-photos';

describe('ReactBnbGallery', () => {
  describe('#render', () => {
    it('unmounts', () => {
      const wrapper = mount((
        <ReactBnbGallery photos={photos} />
      ));
      wrapper.setProps({ show: true });
      wrapper.unmount();
    });
    it('renders <Gallery />', () => {
      const wrapper = shallow((
        <ReactBnbGallery
          photos={photos}
          show
        />
      )).dive();
      expect(wrapper.find(Gallery)).toHaveLength(1);
    });
  });
});
