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

interface Props extends ConnectProps { }

interface State {
  upPressed: boolean;
  downPressed: boolean;
}
class Controller extends React.Component<Props, State> {
  handleIsPlayerSelected = (playerNumber: number) => {
    const { state } = this.props;
    return (
      state.playerNumber && parseInt(state.playerNumber, 0) !== playerNumber
    );
  }

  constructor(p: Props) {
    super(p);
    this.state = {
      upPressed: false,
      downPressed: false,
    };
    this.handlePressDown = this.handlePressDown.bind(this);
    this.handlePressUp = this.handlePressUp.bind(this);
    this.handleReleaseDown = this.handleReleaseDown.bind(this);
    this.handleReleaseUp = this.handleReleaseUp.bind(this);
  }

  handlePressUp() {
    const { upPressed, downPressed } = this.state;
    const { actions } = this.props;
    if (downPressed && upPressed) {
      actions.sendController("down_release")();
    }
    if (downPressed && !upPressed) {
      // actions.sendController("down_release");
      actions.sendController("up_press")();
    }
    if (!downPressed && !upPressed) {
      actions.sendController("up_press")();
    }
    this.setState({ upPressed: true });
  }

  handlePressDown() {
    const { upPressed, downPressed } = this.state;
    const { actions } = this.props;
    if (downPressed && upPressed) {
      actions.sendController("up_release")();
    }
    if (!downPressed && upPressed) {
      // actions.sendController("up_release");
      actions.sendController("down_press")();
    }
    if (!downPressed && !upPressed) {
      actions.sendController("down_press")();
    }
    this.setState({ downPressed: true });
  }

  handleReleaseUp() {
    const { upPressed, downPressed } = this.state;
    const { actions } = this.props;
    if (downPressed && upPressed) {
      // actions.sendController("up_release");
      actions.sendController("down_press")();
    }
    if (!downPressed && upPressed) {
      actions.sendController("up_release")();
    }
    this.setState({ upPressed: false });
  }

  handleReleaseDown() {
    const { upPressed, downPressed } = this.state;
    const { actions } = this.props;
    if (downPressed && upPressed) {
      // actions.sendController("down_release");
      actions.sendController("up_press")();
    }
    if (downPressed && !upPressed) {
      actions.sendController("down_release")();
    }
    this.setState({ downPressed: false });
  }

  render() {
    const { state } = this.props;
    return (
      <Container>
        <OuterPlayer>
          <PlayerMenu />
        </OuterPlayer>
        <div>
          <Button
            disabled={!state.playerNumber}
            onTouchStart={this.handlePressUp}
            onPointerDown={this.handlePressUp}
            onTouchEnd={this.handleReleaseUp}
            onPointerUp={this.handleReleaseUp}
          >
            <IconArrow />
          </Button>
        </div>
        <div>
          <Button
            disabled={!state.playerNumber}
            onTouchStart={this.handlePressDown}
            onPointerDown={this.handlePressDown}
            onTouchEnd={this.handleReleaseDown}
            onPointerUp={this.handleReleaseDown}
          >
            <IconArrowDown />
          </Button>
        </div>
      </Container>
    );
  }
}

export default connect()(Controller);
