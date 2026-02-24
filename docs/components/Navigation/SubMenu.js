import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

export const ItemsShape = PropTypes.arrayOf(
  PropTypes.shape({
    slug: PropTypes.string.isRequired,
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }),
);

const defaultProps = {
  items: [],
};

const propTypes = {
  items: ItemsShape,
};

const SubMenu = ({
  items,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="pt-2 pb-4">
      {
        items.map(({
          slug,
          url,
          title,
        }) => (
          <li key={slug}>
            <Link
              href={url}
              className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block text-gray-600 hover:translate-x-2px hover:text-black"
            >
              {title}
            </Link>
          </li>
        ))
      }
    </ul>
  );
};

SubMenu.defaultProps = defaultProps;
SubMenu.propTypes = propTypes;

export default SubMenu;
