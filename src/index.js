import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { run } from '@cycle/xstream-run';
import { createCycleMiddleware } from 'redux-cycles';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';


import { makeHTTPDriver } from '@cycle/http';
// import {timeDriver} from '@cycle/time';
import rootReducer from './reducer';
import main from './cycles';
import App from './App';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

const cycleMiddleware = createCycleMiddleware();
const { makeActionDriver } = cycleMiddleware;

const enhancer = persistState();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(cycleMiddleware),
    // enhancer
  )
);

run(main, {
  ACTION: makeActionDriver(),
  HTTP: makeHTTPDriver(),
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
