import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Meter from './Meter';

ReactDOM.render(
  <Router>
    <div>
      <Route path={'/'} component={Meter}></Route>
    </div>
  </Router>,
  document.getElementById('root')
);
