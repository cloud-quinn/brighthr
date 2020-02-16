import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from '.';

Enzyme.configure({ adapter: new Adapter() });

const getHeader = () => shallow(<Header />);

describe('Header Component', () => {
    let header;

    beforeAll(() => {
        header = getHeader();
    });

    it('renders', () => {
        expect(header.exists()).toBe(true);
    });
});
