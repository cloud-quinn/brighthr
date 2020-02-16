import sortDocuments from './sortDocuments';

const mockDocuments = [{
  prop1: 3,
},
{
  prop1: 1,
},
{
  prop1: 2,
}];

describe('Helper: Sort Documents', () => {
  describe('document is undefined', () => {
    it('returns an empty array', () => {
      expect(sortDocuments(undefined, 'prop1')).toEqual([]);
    });
  });

  describe('documents array is empty', () => {
    it('returns an empty array', () => {
      expect(sortDocuments([], 'prop1')).toEqual([]);
    });
  });

  describe('sortBy property is undefined', () => {
    it('returns the input documents unchanged', () => {
      expect(sortDocuments(mockDocuments, undefined)).toEqual(mockDocuments);
    });
  });

  describe('sortBy property is not a property of any the documents', () => {
    it('returns the input documents unchanged', () => {
      expect(sortDocuments(mockDocuments, undefined)).toEqual(mockDocuments);
    });
  });

  describe('happy path descending', () => {
    it('returns the input documents in the expect sort order', () => {
      const expected = [{
        prop1: 3,
      },
      {
        prop1: 2,
      },
      {
        prop1: 1,
      }];
      expect(sortDocuments(mockDocuments, 'prop1')).toEqual(expected);
    });
  });

  describe('happy path ascending', () => {
    it('returns the input documents in the expect sort order', () => {
      const expected = [{
        prop1: 1,
      },
      {
        prop1: 2,
      },
      {
        prop1: 3,
      }];
      expect(sortDocuments(mockDocuments, 'prop1', true)).toEqual(expected);
    });
  });
});
