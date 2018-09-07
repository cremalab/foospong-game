import React from "react";
import styled from "styled-components";
import { connect, ConnectProps } from "../../store";
import Button from "../Button";

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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin: 0.4em 0;
  font-size: 1.5em;
`;

class ControllerMenu extends React.Component<ConnectProps> {
  componentDidMount() {
    const { client, actions } = this.props;
    client.subscribe("/pauseGame", () => {
      actions.setPaused(true);
    });
    client.subscribe("/resumeGame", () => {
      actions.setPaused(false);
    });
  }
  render() {
    const { actions, state } = this.props;
    return (
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => {
              location.href = "#";
            }}
          >
            Close
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              actions.startGame();
              location.href = "#";
            }}
          >
            Start Game
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          {state.isPaused ? (
            <Button
              onClick={() => {
                actions.resumeGame();
                location.href = "#";
              }}
            >
              Resume Game
            </Button>
          ) : (
            <Button
              onClick={() => {
                actions.pauseGame();
              }}
            >
              Pause Game
            </Button>
          )}
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={() => (location.href = "#instructions")}>
            Instructions
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

export default connect()(ControllerMenu);
