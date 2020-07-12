import React from 'react';

import Link from 'next/link';

import docsPages from '../../data/getDocsPages';

const DocsNav = () => (
  <div className="">
    <ul className="space-y-2">
      {
        docsPages.map(({
          slug,
          data: {
            title,
          },
        }) => (
          <li key={slug}>
            <Link href={`/docs/${slug}`}>
              <a className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block text-gray-900 hover:translate-x-2px hover:text-black font-medium">
                {title}
              </a>
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default DocsNav;
