import React from 'react';
import PropTypes from 'prop-types';

import GitHubButton from 'react-github-btn'

import { forbidExtraProps } from 'airbnb-prop-types';

const propTypes = forbidExtraProps({
  user: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
});

const GitHubButtonMarkup = ({
  user,
  repo,
}) => {
  const url = `https://github.com/${user}/${repo}`;
  const label = `Star ${user}/${repo} on GitHub`;

  return (
    <GitHubButton
      href={url}
      data-size="large"
      data-show-count="true"
      aria-label={label}>
      Star
    </GitHubButton>
  )
};

GitHubButtonMarkup.propTypes = propTypes;

export default GitHubButtonMarkup;
