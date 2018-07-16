import React from "react";
import Pong from "./Pong";
import Controller from "./Controller";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Store } from "../store";

class App extends React.Component {
  render = () => {
    return (
      <Store>
        <Router>
          <div>
            <Route exact path="/" component={Pong} />
            <Route exact path="/controller" component={Controller} />
          </div>
        </Router>
      </Store>
    );
  };
}

export default App;
