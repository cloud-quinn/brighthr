import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import HomePage from '.';
import { Document } from '../../components';
import { ErrorMessage } from '../../components/messages';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../helpers/documents/isFolder');

const defaultMockData = {
  documents: {
    all: [],
    error: false,
    fetching: false,
  },
};

const mockStoreConfig = configureMockStore([thunk]);
let mockStore;

const getHomePage = (mockData = defaultMockData) => {
  mockStore = mockStoreConfig(mockData);
  return mount(
    <Provider store={mockStore}>
      <HomePage />
    </Provider>,
  );
};

const getLoadingSpinner = (homePage) => homePage.find({ 'data-icon': 'spinner' });

describe('Home Page', () => {
  let homePage;
  let loadingSpinner;

  it('renders', () => {
    homePage = getHomePage();
    expect(homePage.exists()).toBe(true);
    homePage.unmount();
  });

  describe('Happy Path', () => {
    const mockData = {
      ...defaultMockData.documents,
      documents: {
        ...defaultMockData.documents,
        all: [{
          type: 'mockType',
          name: 'Mock Name',
          added: '2020-02-14',
          id: 'file1',
        },
        {
          type: 'mockType2',
          name: 'Mock Name 2',
          added: '2020-01-02',
          id: 'file2',
        }],
        error: false,
        fetching: false,
      },
    };

    beforeAll(() => {
      homePage = getHomePage(mockData);
      loadingSpinner = getLoadingSpinner(homePage);
    });

    afterAll(() => {
      homePage.unmount();
      loadingSpinner = undefined;
    });

    it('displays a list of documents', () => {
      expect(homePage.find(Document)).toHaveLength(2);
    });

    it('does not display an error message', () => {
      expect(homePage.find(ErrorMessage).exists()).toBe(false);
    });

    it('does not display a loading spinner', () => {
      expect(loadingSpinner.exists()).toBe(false);
    });
  });

  describe('Error fetching documents', () => {
    const mockData = {
      ...defaultMockData.documents,
      documents: {
        ...defaultMockData.documents,
        error: true,
        fetching: false,
      },
    };

    beforeAll(() => {
      homePage = getHomePage(mockData);
      loadingSpinner = getLoadingSpinner(homePage);
    });

    afterAll(() => {
      homePage.unmount();
      loadingSpinner = undefined;
    });

    it('does not display a list of documents', () => {
      expect(homePage.find(Document).exists()).toBe(false);
    });

    it('displays an error message', () => {
      expect(homePage.find(ErrorMessage).exists()).toBe(true);
    });

    it('does not display a loading spinner', () => {
      expect(loadingSpinner.exists()).toBe(false);
    });
  });

  describe('Fetching documents', () => {
    const mockData = {
      ...defaultMockData.documents,
      documents: {
        ...defaultMockData.documents,
        fetching: true,
      },
    };

    beforeAll(() => {
      homePage = getHomePage(mockData);
      loadingSpinner = getLoadingSpinner(homePage);
    });

    afterAll(() => {
      homePage.unmount();
      loadingSpinner = undefined;
    });

    it('does not display a list of documents', () => {
      expect(homePage.find(Document).exists()).toBe(false);
    });

    it('does not display an error message', () => {
      expect(homePage.find(ErrorMessage).exists()).toBe(false);
    });

    it('displays a loading spinner', () => {
      expect(loadingSpinner.exists()).toBe(true);
    });
  });
});
