import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import HomePage from './HomePage';

function setup(saving) {
    const props = {
        onSave: () => {},
        onChange: () => {}
    };

    return shallow(<HomePage {...props} />);
}
describe('HomePage via Enzyme', () => {
    it('renders div and h1', () => {
        const wrapper = setup(false);
        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Hello');
    });
});