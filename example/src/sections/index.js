import React from 'react';
import GettingStarted from './GettingStarted';
import Help from './Help';
import License from './License';
import Options from './Options';

export default [{
  id: 'getting-started',
  title: 'Getting Started',
  getComponent: () => <GettingStarted />
}, {
  id: 'options',
  title: 'Options',
  getComponent: () => <Options />
}, {
  id: 'license',
  title: 'License',
  getComponent: () => <License />
}, {
  id: 'help',
  title: 'Help',
  getComponent: () => <Help />
}];
