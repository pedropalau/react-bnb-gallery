import React from 'react';

import Home from './Home';
import GettingStarted from './GettingStarted';
import Options from './Options';
import Examples from './Examples';
import License from './License';
import Help from './Help';

export default [{
  id: 'home',
  title: 'Home',
  disabled: false,
  isDefault: true,
  getComponent: () => <Home />
}, {
  id: 'getting-started',
  title: 'Getting Started',
  disabled: false,
  isDefault: false,
  getComponent: () => <GettingStarted />
}, {
  id: 'options',
  title: 'Options',
  disabled: false,
  isDefault: false,
  getComponent: () => <Options />
}, {
  id: 'examples',
  title: 'Examples',
  disabled: true,
  isDefault: false,
  getComponent: () => <Examples />
}, {
  id: 'license',
  title: 'License',
  disabled: false,
  isDefault: false,
  getComponent: () => <License />
}, {
  id: 'help',
  title: 'Help',
  disabled: false,
  isDefault: false,
  getComponent: () => <Help />
}];
