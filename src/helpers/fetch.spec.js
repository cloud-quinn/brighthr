import fetch from './fetch';

jest.mock('../constants/documents.json', () => ([{
  type: 'mockType',
  name: 'Mock Name',
  added: '2020-01-01',
}]));

describe('Placeholder Helper: Fetch Documents', () => {
  it('returns the data from a local JSON file for now', () => {
    expect(fetch()).toEqual([{
      type: 'mockType',
      name: 'Mock Name',
      added: '2020-01-01',
    }]);
  });
});
