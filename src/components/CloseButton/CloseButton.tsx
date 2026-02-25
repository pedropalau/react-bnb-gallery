import PropTypes from 'prop-types';
import React from 'react';

import { forbidExtraProps } from '../../common/prop-types';
import { INVERSE_COLOR, NORMAL_COLOR } from '../../constants';
import noop from '../../utils/noop';

const CLOSE_PATH =
	'm23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22';

const buttonStyle = {
	height: '2em',
	width: '2em',
	display: 'block',
	fill: NORMAL_COLOR,
};

const buttonStyleLight = {
	fill: INVERSE_COLOR,
};

const propTypes = forbidExtraProps({
	onPress: PropTypes.func,
	light: PropTypes.bool,
});

interface CloseButtonProps {
	onPress?: () => void;
	light?: boolean;
}

const CloseButton = ({ onPress = noop, light = false }: CloseButtonProps) => (
	<button
		onClick={onPress}
		className="gallery-close"
		type="button"
		aria-label="Close gallery"
		aria-busy={false}
	>
		<svg
			viewBox="0 0 24 24"
			role="img"
			focusable="false"
			style={{
				...buttonStyle,
				...(light && buttonStyleLight),
			}}
		>
			<path d={CLOSE_PATH} fillRule="evenodd" />
		</svg>
	</button>
);

CloseButton.propTypes = propTypes;

export default CloseButton;
