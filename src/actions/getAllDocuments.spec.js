import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import documentData from './documents.json';

import getAllDocuments, { DOCUMENTS_FETCHED, FETCHING_DOCUMENTS } from './getAllDocuments';

jest.mock('./documents.json', () => ([{
  type: 'mockType',
  name: 'Mock Name',
  added: '2020-02-14',
}]));

describe('Action: Get All Documents', () => {
  let mockStoreConfig;
  let mockStore;
  let dispatchedActions;

  describe('Happy Path', () => {
    beforeAll(async () => {
      mockStoreConfig = configureMockStore([thunk]);
      mockStore = mockStoreConfig();
      await mockStore.dispatch(getAllDocuments());
      dispatchedActions = await mockStore.getActions();
    });

    afterAll(() => {
      dispatchedActions = [];
      mockStore = undefined;
      documentData.mockReset();
    });

    it('dispatches a "fetching" action to let the store know data is on its way', () => {
      const [firstAction] = dispatchedActions;
      expect(firstAction.type).toBe(FETCHING_DOCUMENTS);
    });

    it('dispatches a "fetched" action that returns the fetched documents', () => {
      const fetchedAction = dispatchedActions[1];
      const expected = {
        type: DOCUMENTS_FETCHED,
        payload: [{
          type: 'mockType',
          name: 'Mock Name',
          added: '2020-02-14',
        }],
        error: false,
      };
      expect(fetchedAction).toEqual(expected);
    });
  });
});
