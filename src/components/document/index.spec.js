import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Document from '.';
import { File, FileList, Folder } from './index.styles';
import isFolder from '../../helpers/documents/isFolder';

jest.mock('../../helpers/documents/isFolder');

Enzyme.configure({ adapter: new Adapter() });

const defaultMockDocument = {
  type: 'mockType',
  name: 'Mock Name',
  added: '2020-01-01',
  id: 'file1',
};

const getDocument = (mockDocument = defaultMockDocument) => shallow(<Document document={mockDocument} />);

describe('Document Component', () => {
  let document;

  it('renders', () => {
    document = getDocument();
    expect(document.exists()).toBe(true);
    document.unmount();
  });

  describe('Non-folder file type', () => {
    beforeAll(() => {
      isFolder.mockImplementation(() => false);
      document = getDocument();
    });

    afterAll(() => {
      isFolder.mockReset();
      document.unmount();
    });

    it('displays one file', () => {
      expect(document.find(File)).toHaveLength(1);
    });

    it('does not display a file list', () => {
      expect(document.find(FileList).exists()).toBe(false);
    });

    it('does not display a folder', () => {
      expect(document.find(Folder).exists()).toBe(false);
    });
  });

  describe('Folder file type', () => {
    const mockDocument = {
      ...defaultMockDocument,
      files: [{
        type: 'mockType2',
        name: 'Mock Name 2',
        added: '2020-01-02',
        id: 'file2',
      },
      {
        type: 'mockType3',
        name: 'Mock Name 3',
        added: '2020-01-03',
        id: 'file3',
      }],
    };

    beforeAll(() => {
      isFolder.mockImplementation(() => true);
      document = getDocument(mockDocument);
    });

    afterAll(() => {
      isFolder.mockReset();
      document.unmount();
    });

    describe('When not expanded', () => {
      it('displays one folder', () => {
        expect(document.find(Folder)).toHaveLength(1);
      });

      it('does not display a file list', () => {
        expect(document.find(FileList).exists()).toBe(false);
      });

      it('does not display a file', () => {
        expect(document.find(File).exists()).toBe(false);
      });
    });

    describe('When expanded', () => {
      beforeAll(() => {
        document.find(Folder).simulate('click');
      });

      it('displays the folder document', () => {
        expect(document.find(Folder)).toHaveLength(1);
      });

      it('displays a file list', () => {
        expect(document.find(FileList)).toHaveLength(1);
      });

      it('displays all the files in the folder', () => {
        expect(document.find(File)).toHaveLength(2);
      });
    });
  });
});
