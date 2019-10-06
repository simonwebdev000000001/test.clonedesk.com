import React, { Component } from 'react';

import store from './redux'
import { Provider } from 'react-redux'

import AppRoutes from './routes'

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </div>
    );
  }
}
