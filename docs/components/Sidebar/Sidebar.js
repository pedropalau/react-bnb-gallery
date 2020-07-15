import React from 'react';

import DocsNav from '../DocsNav';

const Sidebar = () => (
  <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:top-10 bg-white lg:bg-transparent">
    <DocsNav />
  </div>
);

export default Sidebar;
