import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getAllDocuments from '../../actions/getAllDocuments';
import Container from '../../components/container';

@connect(
  (state) => ({
    documents: state.documents.all,
  }),
  (dispatch) => bindActionCreators({
    getAllDocuments,
  }, dispatch),
)
export default class HomePage extends React.Component {
    static propTypes = {
      documents: PropTypes.arrayOf(PropTypes.shape({})),
      getAllDocuments: PropTypes.func.isRequired,
    };

    static defaultProps = {
      documents: [],
    };

    componentDidMount() {
      const { getAllDocuments: fetchDocuments } = this.props;
      fetchDocuments();
    }

    render() {
      const { documents } = this.props;
      return (
        <Container>
          <h1>Documents</h1>
          <div>
            {documents.map((doc) => JSON.stringify(doc))}
          </div>
        </Container>
      );
    }
}
