import PropTypes from 'prop-types';

// @ts-ignore - legacy JS module pending Phase 7 migration
import { forbidExtraProps } from './prop-types';

export default forbidExtraProps({
  onLoad: PropTypes.func,
  onError: PropTypes.func,
});
