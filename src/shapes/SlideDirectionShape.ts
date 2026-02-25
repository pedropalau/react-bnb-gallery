import PropTypes from 'prop-types';

import { BACKWARDS, FORWARDS } from '../constants';

export default PropTypes.oneOf([FORWARDS, BACKWARDS]);
