import { THUMBNAIL_WIDTH } from '../src/constants';
import {
	calculateThumbnailsContainerDimension,
	calculateThumbnailsLeftScroll,
	calculateThumbnailsOffset,
} from '../src/utils/thumbnail-layout';

describe('the calculateThumbnailsOffset function', () => {
	it('offset with current 0 and width of 100', () => {
		expect(calculateThumbnailsOffset(0, { width: 100 })).toBe(17);
	});
	it('offset with current 0 and width of 200', () => {
		expect(calculateThumbnailsOffset(0, { width: 100 })).toBe(17);
	});
	it('offset with current 1 and width of 100', () => {
		expect(calculateThumbnailsOffset(1, { width: 100 })).toBe(-57);
	});
	it('offset with current 1 and width of 175', () => {
		expect(calculateThumbnailsOffset(1, { width: 175 })).toBe(-19.5);
	});
	it('offset with current 100 and width of 999999', () => {
		expect(calculateThumbnailsOffset(100, { width: 999999 })).toBe(492566.5);
	});
});

describe('the calculateThumbnailsContainerDimension function', () => {
	it('dimension with total of 1', () => {
		expect(calculateThumbnailsContainerDimension(1)).toBe(THUMBNAIL_WIDTH + 8);
	});
	it('dimension with total of 10', () => {
		expect(calculateThumbnailsContainerDimension(10)).toBe(732);
	});
	it('dimension with total of 21', () => {
		expect(calculateThumbnailsContainerDimension(21)).toBe(1546);
	});
	it('dimension with total of 999', () => {
		expect(calculateThumbnailsContainerDimension(999)).toBe(73918);
	});
});

describe('the calculateThumbnailsLeftScroll function', () => {
	it('does not scroll when current thumbnail is within the left edge window', () => {
		expect(calculateThumbnailsLeftScroll(0, 10, { width: 320 })).toBe(0);
		expect(calculateThumbnailsLeftScroll(1, 10, { width: 320 })).toBe(0);
	});

	it('centers a middle thumbnail by applying a negative scroll offset', () => {
		expect(calculateThumbnailsLeftScroll(5, 10, { width: 320 })).toBe(-243);
	});

	it('clamps to the maximum scroll near the end of the list', () => {
		expect(calculateThumbnailsLeftScroll(9, 10, { width: 320 })).toBe(-412);
	});
});
