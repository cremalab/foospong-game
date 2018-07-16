import React from "react";
import styled from "styled-components";
import { Consumer } from "../store";
import IconArrow from "./IconArrow";

const OuterPlayer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 20vh;
`;

const PlayerSelect = styled.select`
  width: 20vw;
  margin-left: 10px;
  height: 30px;
  font-size: 25px;
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

class Controller extends React.Component {
  render = () => {
    return (
      <Consumer>
        {({ actions, state }) => {
          return (
            <div>
              <OuterPlayer>
                <label>Player #</label>
                <PlayerSelect
                  onChange={e => {
                    actions.setPlayer(e.target.selectedIndex);
                  }}
                  value={state.playerNumber}
                >
                  <option value="">...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </PlayerSelect>
              </OuterPlayer>
              {state.playerNumber && (
                <div>
                  <Button
                    onTouchStart={actions.sendController("up_press")}
                    onPointerDown={actions.sendController("up_press")}
                    onTouchEnd={actions.sendController("up_release")}
                    onPointerUp={actions.sendController("up_release")}
                  >
                    <IconArrow />
                  </Button>
                  <Button
                    onTouchStart={actions.sendController("down_press")}
                    onPointerDown={actions.sendController("down_press")}
                    onTouchEnd={actions.sendController("down_release")}
                    onPointerUp={actions.sendController("down_release")}
                  >
                    <IconArrowDown />
                  </Button>
                </div>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  };
}

export default Controller;
