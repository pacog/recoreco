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
import configureStore from './store';
// import LanguageProvider from 'containers/LanguageProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import i18n messages
// import { translationMessages } from './i18n';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import RecoReco from './containers/RecoReco';

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
          <RecoReco />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();


// // Hot reloadable translation json files
// if (module.hot) {
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept('./i18n', () => {
//     render(translationMessages);
//   });
// }
//
// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   (new Promise((resolve) => {
//     resolve(System.import('intl'));
//   }))
//     .then(() => Promise.all([
//       System.import('intl/locale-data/jsonp/de.js'),
//     ]))
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
