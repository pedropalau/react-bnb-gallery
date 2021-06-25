import PropTypes from 'prop-types';

export default PropTypes.shape({
  photo: PropTypes.string.isRequired,
  number: PropTypes.number,
  caption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  subcaption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  thumbnail: PropTypes.string,
});
