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
    describe('Happy path', () => {
      const mockDocuments = [{
        type: 'mockType',
        name: 'Mock Name',
        added: '2020-01-01',
      }];
      beforeAll(() => {
        const mockFetchedAction = {
          type: DOCUMENTS_FETCHED,
          payload: mockDocuments,
          error: false,
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

      it('indicates no errors have occurred', () => {
        expect(reducerState.error).toBe(false);
      });
    });

    describe('Error state', () => {
      const mockError = new Error('Test Error from fetch helper');
      beforeAll(() => {
        const mockFetchedAction = {
          type: DOCUMENTS_FETCHED,
          payload: mockError,
          error: true,
        };
        reducerState = documentsReducer({}, mockFetchedAction);
      });

      afterAll(() => {
        reducerState = undefined;
      });

      it('sets the "fetching" flag to false', () => {
        expect(reducerState.fetching).toBe(false);
      });

      it('does not update the array of all documents', () => {
        expect(reducerState.all.length).toBe(0);
      });

      it('indicates that an error has occurred', () => {
        expect(reducerState.error).toBe(true);
      });
    });
  });
});
