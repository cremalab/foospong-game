import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
  color: white;
  font-family: sans-serif;
  font-size: 1em;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

class Controller extends React.Component {
  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>Foos-Pong!!</h1>
        <p style={{ fontSize: ".8em" }}>
          This is a game we made based on Foosball and the retro arcade game
          Pong (get it?). Two teams of two players control rows of multiple
          paddles (just like the little foosball dudes) and the rest works
          exactly like Pong - just try to get the ball to the opposite edge.
        </p>

        <h3>HOW TO PLAY </h3>
        <ol>
          <li>Choose a player to control</li>
          <li>
            If the game isn’t already in play, select the ‘Play’ option in the
            drop-down menu
          </li>
          <li>Control your paddles with the up and down arrows</li>
        </ol>

        <h3>RULES</h3>
        <ol>
          <li>
            <a href="#" style={{ color: "yellow" }}>
              Who cares, just let me play.
            </a>
          </li>
          <li>The first team to 11 points wins</li>
          <li>
            Team Blue’s goal is on the right, Team Red’s goal is on the left
          </li>
          <li>Please don’t steal someone else’s controller</li>
          <li>Unless you wish to prank them</li>
          <li>But you wouldn’t pull something like that, would you?</li>
        </ol>
        <div style={{ textAlign: "center", fontSize: "2em" }}>
          <a href="#" style={{ color: "yellow" }}>
            PLAY
          </a>
        </div>
      </Container>
    );
  }
}

export default Controller;
