import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import ListCanvases from "./components/ListCanvases";
import history from "./history";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={ListCanvases}></Route>
              <Route exact path="/canvas/:name" component={Canvas}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
