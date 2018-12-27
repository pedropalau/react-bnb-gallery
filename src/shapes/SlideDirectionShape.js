import PropTypes from 'prop-types';

import {
  FORWARDS,
  BACKWARDS
} from '../constants';

export default PropTypes.oneOf([FORWARDS, BACKWARDS]);
