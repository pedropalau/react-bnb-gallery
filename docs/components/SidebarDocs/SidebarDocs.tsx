'use client';

import classnames from 'classnames';

import docsPages from '../../data/getDocsPages';
import Sidebar from '../Sidebar/Sidebar';

interface SidebarDocsProps {
  isOpen?: boolean;
}

export default function SidebarDocs({ isOpen = false }: SidebarDocsProps) {
  return (
    <div
      className={classnames(
        !isOpen && 'hidden',
        'fixed inset-0 z-90 -mb-16 mt-16 h-full w-full bg-white lg:static lg:-mb-0 lg:mt-0 lg:block lg:h-auto lg:w-1/3 lg:overflow-y-visible',
      )}
    >
      <Sidebar menu={docsPages} />
    </div>
  );
}
