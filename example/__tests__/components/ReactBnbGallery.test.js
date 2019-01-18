import React from 'react';
import { shallow, mount } from 'enzyme';

import ReactBnbGallery from '../../../src/ReactBnbGallery';
import Gallery from '../../../src/components/Gallery';

import photos from '../test-photos';

const requiredProps = {
  photos,
}

describe('ReactBnbGallery', () => {
  describe('#render', () => {
    it('unmounts', () => {
      const wrapper = mount((
        <ReactBnbGallery
          {...requiredProps}
        />
      ));
      wrapper.setProps({ show: true });
      wrapper.unmount();
    });
    it('renders <Gallery />', () => {
      const wrapper = shallow((
        <ReactBnbGallery
          {...requiredProps}
          show={true}
        />
      )).dive();
      expect(wrapper.find(Gallery)).toHaveLength(1);
    });
  });
});
