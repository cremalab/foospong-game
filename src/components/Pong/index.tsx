import React from "react";
import Pong from "../../lib/pong/Pong.js";
import { connect, ConnectProps } from "../../store";
import styled from "styled-components";
import playSound from "../../lib/playSound";

const GameTitle = styled.h2`
  font-size: 30;
  color: #fff;
  font-family: sans-serif;
  position: absolute;
  left: 50px;
  opacity: 0.7;
`;

const GameStage = styled.div`
  width: 100vw;
  height: 100vh;
  backgroundcolor: #eee;
`;

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

    this.pong.on("bounce", () => playSound(246.94, 10, 0.6));
    this.pong.on("hit", () => playSound(493.88, 10, 0.7));
    this.pong.on("point", (e: any) => {
      if (e.score === 1) {
        const teamName = e.team === "a" ? "BLUE" : "RED";
        this.pong.winAndCountdown(`${teamName} TEAM WINS!!`, 7);
      }
      playSound(90.61, 400, 0.35);
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
      <GameStage innerRef={c => (this.rootDiv = c)}>
        <GameTitle>FOOS PONG</GameTitle>
      </GameStage>
    );
  }
}

export default connect()(PongGame);
