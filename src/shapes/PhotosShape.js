import PropTypes from 'prop-types';

import PhotoShape from './PhotoShape';

export default PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string.isRequired),
  PropTypes.arrayOf(PhotoShape),
]);
