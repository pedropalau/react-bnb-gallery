import classnames from 'classnames';
import { memo } from 'react';
import { defaultPhrases } from '../defaultPhrases';

/**
 * Props for the thumbnail list visibility toggle.
 */
interface TogglePhotoListProps {
	isOpened?: boolean;
	onPress?: () => void;
	phrases?: typeof defaultPhrases;
}

/**
 * Renders the text button that shows or hides the thumbnail strip.
 */
function TogglePhotoList({
	isOpened = true,
	onPress,
	phrases = defaultPhrases,
}: TogglePhotoListProps) {
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

const MemoizedTogglePhotoList = memo(TogglePhotoList);

export { MemoizedTogglePhotoList as TogglePhotoList };

/**
 * @deprecated Use named import instead: `import { TogglePhotoList } from './toggle-photo-list'`.
 * Default export will be removed in the next major version.
 */
export default MemoizedTogglePhotoList;
