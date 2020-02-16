import { FETCHING_DOCUMENTS, DOCUMENTS_FETCHED } from '../actions/getAllDocuments';

const defaultState = {
  all: [],
  error: false,
  fetching: false,
};

export default (state = defaultState, action = {}) => {
  if (action.error) {
    return {
      ...defaultState,
      error: true,
    };
  }
  switch (action.type) {
    case FETCHING_DOCUMENTS:
      return {
        ...state,
        error: false,
        fetching: true,
      };
    case DOCUMENTS_FETCHED:
      return {
        all: action.payload,
        error: false,
        fetching: false,
      };
    default:
      return state;
  }
};
