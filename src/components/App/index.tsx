import React, { Component } from "react";
import Pong from "../Pong";
import Controller from "../Controller";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Store } from "../../store";
import Instructions from "../Instructions";
import ControllerMenu from "../ControllerMenu";

// https://stackoverflow.com/questions/42033960/is-it-possible-to-match-the-part-of-a-route-in-react-router-4
let HashRoute = ({ component, path, ...routeProps }: any) => {
  const PassedComponent = component;
  return (
    <Route
      {...routeProps}
      component={({ location, ...props }) =>
        location.hash === path && <PassedComponent {...props} />}
    />
  );
};

class App extends Component<any, any> {
  render() {
    return (
      <Store>
        <Router>
          <div>
            <Route exact path="/play" component={Pong} />
            <Route exact path="/" component={Controller} />
            <HashRoute path="#instructions" component={Instructions} />
            <HashRoute path="#menu" component={ControllerMenu} />
          </div>
        </Router>
      </Store>
    );
  }
}

export default App;
