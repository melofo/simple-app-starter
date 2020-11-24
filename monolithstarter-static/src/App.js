import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import HelloPage from "./pages/HelloPage";
import HomePage from "./pages/HomePage";
import DuplicateListPage from "./pages/DuplicateListPage";
import NonDuplicateListPage from "./pages/NonDuplicateListPage";


class App extends Component {
  render() {
    return (
      <Switch>
        <Route key="home" path="/" exact={true} component={HomePage} />
        <Route key="hello" path="/hello" exact={true} component={HelloPage} />
        <Route key="duplicate-list" path="/duplicate-list" exact={true} component={DuplicateListPage} />
        <Route key="non-duplicate-list" path="/non-duplicate-list" exact={true} component={NonDuplicateListPage} />
      </Switch>
    );
  }
}


export default App;
