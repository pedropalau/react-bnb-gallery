import PropTypes from 'prop-types';

import { forbidExtraProps } from './prop-types';

export default forbidExtraProps({
	onLoad: PropTypes.func,
	onError: PropTypes.func,
});
