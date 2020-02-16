const documentsDefined = (documents) => documents && Array.isArray(documents) && documents.length > 0;
const validSortByProperty = (documents, sortBy) => documents.find((document) => Object.keys(document).includes(sortBy));

// isAscending defaults to false as this will be appropriate for sorting by most recent date, a common use case.
// This can simply be overridden when changing direction (reversing a previously sorted array)
export default (documents, sortBy, isAscending = false) => {
  if (!documentsDefined(documents)) {
    return [];
  }
  if (!validSortByProperty(documents, sortBy)) {
    return documents;
  }
  return documents.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return isAscending ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
};
