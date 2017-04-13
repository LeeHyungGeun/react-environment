/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import routes from './routes';

render(
    <BrowserRouter children={routes} />,
    document.getElementById('app')
);