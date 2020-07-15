import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import SubMenu, { ItemsShape } from './SubMenu';

export const MenuShape = PropTypes.arrayOf(
  PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    items: ItemsShape,
  }),
);

const defaultProps = {
  menu: [],
};

const propTypes = {
  menu: MenuShape,
};

const Navigation = ({
  menu,
}) => (
  <nav className="px-6 pt-6 overflow-y-auto text-base lg:py-14 lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16)">
    <ul className="space-y-2">
      {
        menu.map(({
          slug,
          title,
          url,
          items,
        }) => {
          let content;
          if (url) {
            content = (
              <Link href={`/docs/${slug}`}>
                <a className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block text-gray-900 hover:translate-x-2px text-lg font-semibold hover:text-black">
                  {title}
                </a>
              </Link>
            );
          } else {
            content = (
              <span className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block text-gray-900 hover:translate-x-2px text-lg font-semibold hover:text-black">
                {title}
              </span>
            );
          }

          return (
            <li key={slug}>
              {content}
              {items && (
                <SubMenu items={items} />
              )}
            </li>
          );
        })
      }
    </ul>
  </nav>
);

Navigation.defaultProps = defaultProps;
Navigation.propTypes = propTypes;

export default Navigation;
