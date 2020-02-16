// A very simple case-insensitive filter for the Proof of Concept.
// There will be many other angles and use cases that a full implementation would want to include
// For example, currently a search for "Bright HR" would not match "BrightHR"
export default (documents = [], filterQuery = '') => {
  if (!filterQuery) {
    return [];
  }
  const query = filterQuery.toLowerCase();
  const filteredDocuments = documents.filter((document) => document && document.name.toLowerCase().search(query) !== -1);
  return filteredDocuments;
};
