/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

import 'react-bnb-gallery/dist/style.css';
import '../css/styles.css';

const defaultProps = {
  pageProps: {},
};

const propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

const App = ({
  Component,
  pageProps,
}) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <Component
      {...pageProps}
    />
  </>
);

App.defaultProps = defaultProps;
App.propTypes = propTypes;

export default App;
