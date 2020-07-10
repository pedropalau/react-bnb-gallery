import React from 'react';
import { shallow, mount } from 'enzyme';

import ReactBnbGallery from '../../src/ReactBnbGallery';
import Gallery from '../../src/components/Gallery';

import photos from '../test-photos';

// See https://github.com/focus-trap/focus-trap-react/issues/24#issuecomment-586034017
jest.mock('focus-trap', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => {},
    unpause: () => {},
  };
  return () => trap;
});

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
