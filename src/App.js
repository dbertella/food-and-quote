import React from 'react';
import {
  Route,
} from 'react-router-dom';

import List from './List';
import Page from './Page';
import './App.css';

const App = () => (
  <div className="App">
    <div className="App-header">
      <h1>Food and Quote</h1>
    </div>
    <div>
      <Route exact path="/food-and-quote" component={List}/>
      <Route path="/food-and-quote/:id" component={Page}/>
    </div>
  </div>
);

export default App;
