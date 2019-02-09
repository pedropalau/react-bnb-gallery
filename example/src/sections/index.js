import React from 'react';

import GettingStarted from './GettingStarted';
import Options from './Options';
import Examples from './Examples';
import License from './License';
import Help from './Help';


export default [{
  id: 'getting-started',
  title: 'Getting Started',
  getComponent: () => <GettingStarted />
}, {
  id: 'options',
  title: 'Options',
  getComponent: () => <Options />
}, {
  id: 'examples',
  title: 'Examples',
  disabled: true,
  getComponent: () => <Examples />
}, {
  id: 'license',
  title: 'License',
  getComponent: () => <License />
}, {
  id: 'help',
  title: 'Help',
  getComponent: () => <Help />
}];
