import React, { Component } from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Canvas name="test1"></Canvas>
      </div>
    );
  }
}
