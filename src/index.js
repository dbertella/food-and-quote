import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { run } from '@cycle/xstream-run';
import { createCycleMiddleware } from 'redux-cycles';

// import {makeHTTPDriver} from '@cycle/http';
// import {timeDriver} from '@cycle/time';
import rootReducer, { main } from './reducer';
import App from './App';

import './index.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

const cycleMiddleware = createCycleMiddleware();
const { makeActionDriver } = cycleMiddleware;

const store = createStore(
  rootReducer,
  applyMiddleware(cycleMiddleware)
);

run(main, {
  ACTION: makeActionDriver()
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
