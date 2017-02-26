import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { run } from '@cycle/xstream-run';
import { createCycleMiddleware } from 'redux-cycles';

import { makeHTTPDriver } from '@cycle/http';
// import {timeDriver} from '@cycle/time';
import rootReducer from './reducer';
import main from './cycles';
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
