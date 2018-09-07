import React from "react";
import styled from "styled-components";
import config from "../../lib/pong/config";
import { connect, ConnectProps } from "../../store";
import IconSettings from "../IconSettings";
import Button from "../Button";

const Container = styled.div`
  text-align: center;
`;

interface Props extends ConnectProps {}

class PlayerMenu extends React.Component<Props> {
  handleIsPlayerSelected = (playerNumber: number) => {
    const { state } = this.props;
    return (
      state.playerNumber && parseInt(state.playerNumber, 0) !== playerNumber
    );
  }

  render() {
    const { actions } = this.props;
    return (
      <Container>
        {Object.getOwnPropertyNames(config.players).map((_, i) => (
          <Button
            subtle={this.handleIsPlayerSelected(i + 1)}
            onClick={() => actions.setPlayer(i + 1)}
            key={i}
          >
            P{i + 1}
          </Button>
        ))}
        <Button onClick={() => (location.href = "#menu")}>
          <IconSettings />
        </Button>
      </Container>
    );
  }
}

export default connect()(PlayerMenu);
