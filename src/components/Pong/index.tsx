import React from "react";
import Pong from "../../pong/Pong.js";
import { connect, ConnectProps } from "../../store";

interface Controls {
  up: string;
  down: string;
}

interface PongPlayer {
  [key: string]: {
    addControls: (controls: Controls) => void;
    keyboard: {
      setKeyState: (key: string, keyPressed: boolean) => void;
    };
  };
}
interface Pong {
  players: PongPlayer;
  start: () => void;
}

class PongGame extends React.Component<ConnectProps> {
  pong: Pong;
  rootDiv: HTMLDivElement | null;

  componentDidMount() {
    const { client } = this.props;
    this.pong = new Pong(this.rootDiv);

    const controls: Controls = { up: "up", down: "down" };

    this.pong.players.a.addControls(controls);
    this.pong.players.b.addControls(controls);
    this.pong.players.c.addControls(controls);
    this.pong.players.d.addControls(controls);

    client.subscribe("/player/1", this.handler("a"));
    client.subscribe("/player/2", this.handler("b"));
    client.subscribe("/player/3", this.handler("c"));
    client.subscribe("/player/4", this.handler("d"));
    client.subscribe("/startGame", () => {
      this.pong.start();
    });
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
  }

  render() {
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
  }
}

export default connect()(PongGame);
