import PropTypes from 'prop-types';

export default PropTypes.shape({
  photo: PropTypes.string.isRequired,
  number: PropTypes.number,
  caption: PropTypes.string,
  subcaption: PropTypes.string,
  thumbnail: PropTypes.string,
  component: PropTypes.func,
});
