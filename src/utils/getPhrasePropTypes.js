import PropTypes from 'prop-types';

export default function defaultPhrases() {
  return Object.keys(defaultPhrases)
    .reduce((phrases, key) => ({
      ...phrases,
      [key]: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.node,
      ]),
    }), {});
}
