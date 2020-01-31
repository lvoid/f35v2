import React, { Component } from "react";
import { Route } from "react-router";
import { Home } from "./Home/Home";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return <Route exact path="/" component={Home} />;
  }
}
