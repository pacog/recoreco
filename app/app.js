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
import { authManager } from './auth.js';

const store = configureStore();
authManager.setStore(store);

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

store.subscribe(render);
render();

// Offline stuff, disabled for now
// import { install } from 'offline-plugin/runtime';
// install();
