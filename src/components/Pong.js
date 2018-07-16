import React from "react";
import Pong from "../pong/Pong.js";
import { Consumer } from "../store";

class PongGame extends React.Component {
  componentDidMount() {
    this.pong = new Pong(this.rootDiv);

    const controls = { up: "up", down: "down" };

    this.pong.players.a.addControls(controls);
    this.pong.players.b.addControls(controls);
    this.pong.players.c.addControls(controls);
    this.pong.players.d.addControls(controls);
  }

  handler = playerNumber => (update, flags) => {
    this.pong.players[playerNumber].keyboard.setKeyState(
      "up",
      update.event === "up_press"
    );
    this.pong.players[playerNumber].keyboard.setKeyState(
      "down",
      update.event === "down_press"
    );
  };

  render = () => {
    return (
      <Consumer>
        {({ state, client }) => {
          client.subscribe("/player/1", this.handler("a"));
          client.subscribe("/player/2", this.handler("b"));
          client.subscribe("/player/3", this.handler("c"));
          client.subscribe("/player/4", this.handler("d"));

          return (
            <div
              ref={c => (this.rootDiv = c)}
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#444"
              }}
            />
          );
        }}
      </Consumer>
    );
  };
}

export default PongGame;
