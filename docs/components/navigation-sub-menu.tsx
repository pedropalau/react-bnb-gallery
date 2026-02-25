import Link from 'next/link';

import type { DocsSubItem } from '../data/getDocsPages';

interface SubMenuProps {
  items?: DocsSubItem[];
}

export default function SubMenu({ items = [] }: SubMenuProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="pb-4 pt-2">
      {items.map(({ slug, url, title }) => (
        <li key={slug}>
          <Link
            href={url}
            className="relative -mx-2 block px-2 py-1 text-gray-600 transition duration-200 ease-in-out hover:translate-x-2px hover:text-black"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
