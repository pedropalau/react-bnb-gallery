import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

const defaultProps = {};

const propTypes = {
  title: PropTypes.string.isRequired,
};

const HtmlHead = ({
  title,
}) => (
  <Head>
    <title>
      {`${title} | bnbgallery`}
    </title>
  </Head>
);

HtmlHead.defaultProps = defaultProps;
HtmlHead.propTypes = propTypes;

export default HtmlHead;
