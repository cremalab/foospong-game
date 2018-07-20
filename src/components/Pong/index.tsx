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

    // add controls and subscribe to each player's channel
    Object.getOwnPropertyNames(this.pong.players).forEach((key, i) => {
      this.pong.players[key].addControls(controls);
      client.subscribe(`/player/${i + 1}`, this.handler(key));
    });

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
      >
        <h2 style={{ fontSize: 30, color: "#FFF", fontFamily: "sans-serif", position: "absolute", left: "50px", opacity: 0.7}}>FOOS PONG</h2>
      </div>
    );
  }
}

export default connect()(PongGame);
