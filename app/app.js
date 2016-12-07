// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'babel-polyfill';
import './staticFiles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { configureStore } from './store';
import routeConfig from './routes.js';
import { initAuth } from './core/auth';

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory}
                routes={routeConfig}>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
  );
};

initAuth(store.dispatch)
  .then(() => render())
  .catch(error => console.error(error)); // eslint-disable-line no-console

// Offline stuff, disabled for now
// import { install } from 'offline-plugin/runtime';
// install();
