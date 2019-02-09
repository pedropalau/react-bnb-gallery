import React from 'react';

import GithubButton from '../GithubButton/simple';

import sections from '../../sections';

import './component.css';

const Header = () => (
  <header className="header">
    <nav className="navigation">
      <ul className="nav">
        <li>
          <a href="#start">Home</a>
        </li>
        {sections.map(section => {
          if (!section.disabled) {
            return (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  {section.title}
                </a>
              </li>
            );
          } else {
            return null;
          }
        })}
        <li>
          <a href="https://github.com/peterpalau/react-bnb-gallery/" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
      </ul>
    </nav>
    <div className="right">
      <GithubButton />
    </div>
  </header>
);

export default Header;
