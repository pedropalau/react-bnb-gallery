import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { forbidExtraProps } from '../../common/prop-types';
import defaultPhrases from '../../defaultPhrases';
import getPhrasePropTypes from '../../utils/getPhrasePropTypes';
import noop from '../../utils/noop';

const propTypes = forbidExtraProps({
	isOpened: PropTypes.bool,
	onPress: PropTypes.func,
	phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
});

const defaultProps = {
	isOpened: true,
	onPress: noop,
	phrases: defaultPhrases,
};

interface TogglePhotoListProps {
	isOpened?: boolean;
	onPress?: () => void;
	phrases?: typeof defaultPhrases;
}

class TogglePhotoList extends PureComponent<TogglePhotoListProps> {
	static propTypes = propTypes;

	static defaultProps = defaultProps;

	render() {
		const {
			isOpened = true,
			onPress = noop,
			phrases = defaultPhrases,
		} = this.props;

		const { showPhotoList: showLabel, hidePhotoList: hideLabel } = phrases;

		const label = isOpened ? hideLabel : showLabel;

		const className = classnames(
			'gallery-thumbnails--toggle',
			isOpened ? 'hide' : 'open',
		);

		return (
			<button type="button" className={className} onClick={onPress}>
				{label}
			</button>
		);
	}
}

export default TogglePhotoList;
