import PropTypes from 'prop-types';

export default function getPhrasePropTypes(phrasesMap: Record<string, unknown>) {
  return Object.keys(phrasesMap)
    .reduce((phrases, key) => ({
      ...phrases,
      [key]: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.node,
      ]),
    }), {});
}
