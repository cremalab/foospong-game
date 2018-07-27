import React, { Component } from "react";
import Pong from "../Pong";
import Controller from "../Controller";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Store } from "../../store";

class App extends Component<any, any> {
  render() {
    return (
      <Store>
        <Router>
          <div>
            <Route exact path="/play" component={Pong} />
            <Route exact path="/" component={Controller} />
          </div>
        </Router>
      </Store>
    );
  }
}

export default App;
