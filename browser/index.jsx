
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './redux/';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
