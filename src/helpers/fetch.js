import documentData from '../constants/documents.json';

// As this is a Proof of Concept, we are returning JSON data from a local file.
// By returning said data to the requesting Redux action via a placeholder helper, we can make the
// Redux action fully testable against a mocked response, including error handling.
// To make this code production ready, this helper could make a call to a back-end service without
// affecting the established interface that the app currently uses, or the rest of its logic.
export default () => documentData;
