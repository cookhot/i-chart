import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Line from './pages/Line';
import Meter from './pages/Meter';
import Tree from './pages/Tree';
import Tree1 from './pages/Tree1';
import Map from './pages/Map'
import { Link } from 'react-router-dom';
import './App.css'

function Hoc(props) {
  const { CComponent } = props
  return {
    render () {
      return (
        <React.Fragment>
          <Link to={'/'}>返回主页</Link>
          <CComponent></CComponent>
        </React.Fragment>
      )
    }
  }
}


export default class App extends Component {
  render () {
    return (
      <div>
        <Route path={'/line'} render={() => <Hoc CComponent={Line}></Hoc> }></Route>
        <Route path={'/meter'} render={() => <Hoc CComponent={Meter}></Hoc> }></Route>
        <Route path={'/tree'} render={() => <Hoc CComponent={Tree}></Hoc> }></Route>
        <Route path={'/tree1'} render={() => <Hoc CComponent={Tree1}></Hoc> }></Route>
        <Route path={'/map'} render={() => <Hoc CComponent={Map}></Hoc> }></Route>
      </div>
    )
  }
}
