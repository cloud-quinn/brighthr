import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import getAllDocuments from '../../actions/getAllDocuments';
import { Container, Document } from '../../components';
import documentSchema from '../../schemas/document';
import { ErrorMessage } from '../../components/messages';
import { messages } from '../../constants';

@connect(
  (state) => ({
    documents: state.documents.all,
    errorFetchingDocuments: state.documents.error,
    fetching: state.documents.fetching,
  }),
  (dispatch) => bindActionCreators({
    getAllDocuments,
  }, dispatch),
)
export default class HomePage extends React.Component {
    static propTypes = {
      documents: PropTypes.arrayOf(documentSchema),
      errorFetchingDocuments: PropTypes.bool,
      fetching: PropTypes.bool,
      getAllDocuments: PropTypes.func.isRequired,
    };

    static defaultProps = {
      documents: [],
      errorFetchingDocuments: false,
      fetching: false,
    };

    componentDidMount() {
      const { getAllDocuments: fetchDocuments } = this.props;
      fetchDocuments();
    }

    render() {
      const { documents, errorFetchingDocuments, fetching } = this.props;
      return (
        <Container>
          <h1>Documents</h1>
          {fetching && <FontAwesomeIcon icon={faSpinner} spin />}
          {errorFetchingDocuments ? (
            <ErrorMessage>{messages.error.fetchingDocuments}</ErrorMessage>
          ) : documents.map((document) => <Document key={document.id} document={document} />)}
        </Container>
      );
    }
}
