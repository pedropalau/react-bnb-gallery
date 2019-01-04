import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string.isRequired),
  PropTypes.arrayOf(
    PropTypes.shape({
      photo: PropTypes.string.isRequired,
      number: PropTypes.number,
      caption: PropTypes.string,
      subcaption: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  )
]);
