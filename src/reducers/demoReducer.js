import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function demoReducer(state = initialState.demo, action) {
    switch(action.type) {
        case types.DEMO:
            return action.demo;

        default:
            return state;
    }
}