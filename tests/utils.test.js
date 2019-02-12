import calculateThumbnailsOffset from '../src/utils/calculateThumbnailsOffset';
import calculateThumbnailsContainerDimension from '../src/utils/calculateThumbnailsContainerDimension';

import {
  THUMBNAIL_WIDTH,
} from '../src/constants';

describe('the calculateThumbnailsOffset function', () => {
  it('offset with current 0 and width of 100', () => {
    expect(calculateThumbnailsOffset(0, { width: 100 })).toBe(0);
  });
  it('offset with current 0 and width of 200', () => {
    expect(calculateThumbnailsOffset(0, { width: 100 })).toBe(0);
  });
  it('offset with current 1 and width of 100', () => {
    expect(calculateThumbnailsOffset(1, { width: 100 })).toBe(-110);
  });
  it('offset with current 1 and width of 175', () => {
    expect(calculateThumbnailsOffset(1, { width: 175 })).toBe(-72.5);
  });
  it('offset with current 100 and width of 999999', () => {
    expect(calculateThumbnailsOffset(100, { width: 999999 })).toBe(488949.5);
  });
});

describe('the calculateThumbnailsContainerDimension function', () => {
  it('dimension with total of 1', () => {
    expect(calculateThumbnailsContainerDimension(1)).toBe(THUMBNAIL_WIDTH);
  });
  it('dimension with total of 10', () => {
    expect(calculateThumbnailsContainerDimension(10)).toBe(1090);
  });
  it('dimension with total of 21', () => {
    expect(calculateThumbnailsContainerDimension(21)).toBe(2300);
  });
  it('dimension with total of 999', () => {
    expect(calculateThumbnailsContainerDimension(999)).toBe(109880);
  });
});
