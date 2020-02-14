import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import HomePage from '.';

Enzyme.configure({ adapter: new Adapter() });

const defaultMockData = {
  documents: {
    all: [],
    fetched: false,
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

describe('Home Page', () => {
  let homePage;

  beforeAll(() => {
    homePage = getHomePage();
  });

  it('renders', () => {
    expect(homePage.exists()).toBe(true);
  });
});
