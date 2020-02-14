import { FETCHING_DOCUMENTS, DOCUMENTS_FETCHED } from '../actions/getAllDocuments';

const defaultState = {
  all: [],
  fetching: false,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case FETCHING_DOCUMENTS:
      return {
        ...state,
        fetching: true,
      };
    case DOCUMENTS_FETCHED:
      return {
        all: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
