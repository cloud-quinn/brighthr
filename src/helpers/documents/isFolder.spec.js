import isFolder from './isFolder';

jest.mock('../../constants', () => ({
  documentTypes: {
    folder: 'mockFolderType',
  },
}));

describe('Helper: Is Folder', () => {
  describe('document is undefined', () => {
    it('returns false', () => {
      expect(isFolder()).toBe(false);
    });
  });

  describe('document is not a folder', () => {
    it('returns false', () => {
      expect(isFolder({ type: 'mockFile' })).toBe(false);
    });
  });

  describe('document is a folder', () => {
    it('returns true', () => {
      expect(isFolder({ type: 'mockFolderType' })).toBe(true);
    });
  });
});
