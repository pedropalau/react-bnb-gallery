import React from 'react';

import Navigation, { MenuShape } from '../Navigation';

const defaultProps = {
  menu: null,
};

const propTypes = {
  menu: MenuShape,
};

const Sidebar = ({
  menu,
}) => {
  if (!menu) {
    return null;
  }

  return (
    <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:top-16 bg-white lg:bg-transparent">
      <Navigation menu={menu} />
    </div>
  );
};

Sidebar.defaultProps = defaultProps;
Sidebar.propTypes = propTypes;

export default Sidebar;
