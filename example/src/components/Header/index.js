import React from 'react';
import { Link } from "react-router-dom";

import GithubButton from '../GithubButton/simple';

import sections from '../../pages';

import './component.css';

const Header = () => (
  <header className="header">
    <nav className="navigation">
      <ul className="nav">
        {sections.map(section => {
          if (!section.disabled) {
            return (
              <li key={section.id}>
                <Link to={section.id}>
                  {section.title}
                </Link>
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
