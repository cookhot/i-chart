import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Meter from './Meter';
import Tree from './Tree';

ReactDOM.render(
  <Router>
    <div>
      <Route path={'/'} exact component={Meter}></Route>
      <Route path={'/tree'} component={Tree}></Route>
    </div>
  </Router>,
  document.getElementById('root')
);
