import filterDocuments from './filterDocuments';

const mockDocuments = [{
  name: 'BrightHR Brochure',
},
{
  name: 'Introduction to BrightHR',
},
{
  name: 'Document X',
}];

describe('Helper: Filter Documents', () => {
  describe('document is undefined', () => {
    it('returns an empty array', () => {
      expect(filterDocuments(undefined, 'bright')).toEqual([]);
    });
  });

  describe('documents array is empty', () => {
    it('returns an empty array', () => {
      expect(filterDocuments([], 'bright')).toEqual([]);
    });
  });

  describe('filterQuery property is undefined', () => {
    it('returns an empty array', () => {
      expect(filterDocuments(mockDocuments)).toEqual([]);
    });
  });

  describe('filterQuery property does not exist in any of the document names', () => {
    it('returns an empty array', () => {
      expect(filterDocuments(mockDocuments)).toEqual([]);
    });
  });

  describe('happy path case sensitive', () => {
    const expected = [mockDocuments[0], mockDocuments[1]];
    it('returns the matched documents', () => {
      expect(filterDocuments(mockDocuments, 'Bright')).toEqual(expected);
    });
  });

  describe('happy path case insensitive', () => {
    it('returns the matched documents', () => {
      const expected = [mockDocuments[0]];
      expect(filterDocuments(mockDocuments, 'BROCHURE')).toEqual(expected);
    });
  });
});
