import { documentTypes } from '../../constants';

export default (document = {}) => [documentTypes.folder].includes(document.type);
