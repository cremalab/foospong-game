import React from "react";
import styled from "styled-components";
import { connect, ConnectProps } from "../../store";
import IconArrow from "../IconArrow";
import PlayerMenu from "../PlayerMenu";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const OuterPlayer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 20vh;
`;

const Button = styled.button`
  user-select: none;
  width: 90vw;
  height: 30vh;
  background-color: cornflowerblue;
  border-radius: 10px;
  border: 2px solid black;
  margin: 2vh 5vw;

  &:active {
    background-color: #bad2ff;
  }

  &:focus {
    outline: none;
  }
`;

const IconArrowDown = styled(IconArrow)`
  transform: rotate(180deg);
`;

interface Props extends ConnectProps {}

class Controller extends React.Component<Props> {
  handleIsPlayerSelected = (playerNumber: number) => {
    const { state } = this.props;
    return (
      state.playerNumber && parseInt(state.playerNumber, 0) !== playerNumber
    );
  }

  render() {
    const { actions, state } = this.props;
    return (
      <Container>
        <OuterPlayer>
          <PlayerMenu />
        </OuterPlayer>
        <div>
          <Button
            disabled={!state.playerNumber}
            onTouchStart={actions.sendController("up_press")}
            onPointerDown={actions.sendController("up_press")}
            onTouchEnd={actions.sendController("up_release")}
            onPointerUp={actions.sendController("up_release")}
          >
            <IconArrow />
          </Button>
        </div>
        <div>
          <Button
            disabled={!state.playerNumber}
            onTouchStart={actions.sendController("down_press")}
            onPointerDown={actions.sendController("down_press")}
            onTouchEnd={actions.sendController("down_release")}
            onPointerUp={actions.sendController("down_release")}
          >
            <IconArrowDown />
          </Button>
        </div>
      </Container>
    );
  }
}

export default connect()(Controller);
