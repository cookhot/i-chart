import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Index from './pages/index';
import App from "./App";

ReactDOM.render(
  <Router>
    <div>
      <Route path={'/'} exact component={Index}></Route>
      <App></App>
    </div>
  </Router>,
  document.getElementById('root')
);
