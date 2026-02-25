import Link from 'next/link';

import type { DocsNavItem } from '../data/getDocsPages';
import SubMenu from './navigation-sub-menu';

interface NavigationProps {
  menu?: DocsNavItem[];
}

export default function Navigation({ menu = [] }: NavigationProps) {
  return (
    <nav className="overflow-y-auto px-6 pt-6 text-base lg:py-14 lg:pl-6 lg:pr-8">
      <ul className="space-y-2">
        {menu.map(({ slug, title, url, items }) => (
          <li key={slug}>
            {url ? (
              <Link
                href={`/docs/${slug}`}
                className="relative -mx-2 block px-2 py-1 text-lg font-semibold text-gray-900 transition duration-200 ease-in-out hover:translate-x-2px hover:text-black"
              >
                {title}
              </Link>
            ) : (
              <span className="relative -mx-2 block px-2 py-1 text-lg font-semibold text-gray-900 transition duration-200 ease-in-out hover:translate-x-2px hover:text-black">
                {title}
              </span>
            )}
            {items ? <SubMenu items={items} /> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
