import React from 'react';

import Link from 'next/link';

import Logo from '../Logo';

const Header = () => (
  <header className="w-full relative py-6 border-b border-gray-200">
    <div className="container max-w-screen-lg mx-auto px-10">
      <Link href="/">
        <a title="Home" className="block w-48">
          <Logo />
        </a>
      </Link>
    </div>
  </header>
);

export default Header;
