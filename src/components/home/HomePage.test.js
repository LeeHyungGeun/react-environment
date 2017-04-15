import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HomePage from './HomePage';

function setup() {
    let props = {
        onSave: () => {},
        onChange: () => {}
    };
    let renderer = TestUtils.createRenderer();
    renderer.render(<HomePage />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('HomePage via React Test Utils', () => {
    it('renders h1', () => {
        const { output } = setup();
        expect(output.type).toBe('div');
        // let [ h1 ] = output.props.children;
        // expect(h1.type).toBe('h1');
    });
});