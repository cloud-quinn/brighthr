import documentsReducer from './documents';
import { FETCHING_DOCUMENTS, DOCUMENTS_FETCHED } from '../actions/getAllDocuments';

describe('Reducer: documents', () => {
  let reducerState;

  describe('an unrelated action', () => {
    const mockState = {
      mockProperty: 'mockValue',
    };
    const mockAction = 'MOCK_ACTION';

    beforeAll(() => {
      reducerState = documentsReducer(mockState, mockAction);
    });

    afterAll(() => {
      reducerState = undefined;
    });

    it('returns the current state', () => {
      expect(reducerState).toEqual(mockState);
    });
  });

  describe('Fetching Documents action', () => {
    beforeAll(() => {
      const mockFetchingAction = {
        type: FETCHING_DOCUMENTS,
      };
      reducerState = documentsReducer({}, mockFetchingAction);
    });

    afterAll(() => {
      reducerState = undefined;
    });

    it('sets the "fetching" flag to true', () => {
      expect(reducerState.fetching).toBe(true);
    });
  });

  describe('Documents fetched action', () => {
    const mockDocuments = [{
      type: 'mockType',
      name: 'Mock Name',
      added: '2020-02-14',
    }];
    beforeAll(() => {
      const mockFetchedAction = {
        type: DOCUMENTS_FETCHED,
        payload: mockDocuments,
      };
      reducerState = documentsReducer({}, mockFetchedAction);
    });

    afterAll(() => {
      reducerState = undefined;
    });

    it('sets the "fetching" flag to false', () => {
      expect(reducerState.fetching).toBe(false);
    });

    it('updates the array of all documents', () => {
      expect(reducerState.all).toEqual(mockDocuments);
    });
  });
});
