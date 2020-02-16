import fetch from '../helpers/fetch';

export const FETCHING_DOCUMENTS = 'FETCHING_DOCUMENTS';
export const DOCUMENTS_FETCHED = 'DOCUMENTS_FETCHED';

export default () => async (dispatch) => {
  dispatch({ type: FETCHING_DOCUMENTS });

  try {
    const documentData = fetch();
    return dispatch({
      type: DOCUMENTS_FETCHED,
      payload: documentData,
      error: false,
    });
  } catch (e) {
    return dispatch({
      type: DOCUMENTS_FETCHED,
      payload: e,
      error: true,
    });
  }
};
