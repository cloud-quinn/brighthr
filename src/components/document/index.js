import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faFolderMinus, faFile } from '@fortawesome/free-solid-svg-icons';

import isFolder from '../../helpers/documents/isFolder';
import { keyCodes, messages } from '../../constants';
import { File, FileList, Folder } from './index.styles';
import documentSchema from '../../schemas/document';
import { Message } from '../messages';

export default class Document extends React.Component {
    static propTypes = {
      document: documentSchema,
    };

    static defaultProps = {
      document: {},
    };

    constructor(props) {
      super(props);
      this.state = {
        isExpanded: false,
      };
    }

    toggleFolder = () => {
      this.setState((prevState) => ({
        isExpanded: !prevState.isExpanded,
      }));
    }

    render() {
      const { document } = this.props;
      const { isExpanded } = this.state;

      if (isFolder(document)) {
        const folderContainsFiles = (document.files && Array.isArray(document.files) && document.files.length > 0);
        return (
          <Folder
            ariaExpanded={isExpanded}
            ariaLabel="Open folder"
            onClick={this.toggleFolder}
            onKeyDown={(e) => {
              if ([keyCodes.enter, keyCodes.space].includes(e.key)) {
                e.preventDefault();
                this.toggleFolder();
              }
            }}
          >
            <FontAwesomeIcon icon={isExpanded ? faFolderMinus : faFolderPlus} />
            {document.name}
            {isExpanded && (
              <>
                {folderContainsFiles ? (
                  <FileList>
                    {document.files.map((file) => (
                      <File
                        as="li"
                        key={file.id}
                      >
                        <FontAwesomeIcon icon={faFile} />
                        {file.name}
                      </File>
                    ))}
                  </FileList>
                ) : (
                  <Message>{messages.emptyFolder}</Message>
                )}
              </>
            )}
          </Folder>
        );
      }
      return (
        <File>
          <FontAwesomeIcon icon={faFile} />
          {document.name}
        </File>
      );
    }
}
