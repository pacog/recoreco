import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Dashboard from './containers/Dashboard';
import Reco from './containers/Reco';
import AddReco from './containers/AddReco';

const store = configureStore();

const routeConfig = [
  { path: '/',
    component: Dashboard
  },
  { path: '/add',
    component: AddReco
  },
  { path: '/reco/:recoId',
    component: Reco
  }
];





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

import { install } from 'offline-plugin/runtime';
install();
