import React, { Component, createContext } from "react";
import Nes from "nes";
import connect, { ConnectProps } from "./connect";

const Context = createContext({});

const { Provider, Consumer } = Context;

export interface State {
  readonly connected: boolean;
  readonly playerNumber?: string;
  readonly isPlaying: boolean;
  readonly isPaused: boolean;
}

class Store extends Component<any, State> {
  readonly state: State = {
    connected: false,
    isPlaying: false,
    isPaused: false,
  };

  actions = {
    sendController: event => () =>
      this.client.request({
        method: "POST",
        path: `/player/${this.state.playerNumber}`,
        payload: {
          event,
        },
      }),

    setPlayer: (playerNumber: string) => {
      this.setState({
        playerNumber,
      });
    },

    setPlaying: (isPlaying: boolean) => {
      this.setState({ isPlaying });
    },

    setPaused: (isPaused: boolean) => {
      this.setState({ isPaused });
    },

    startGame: () =>
      this.client.request({
        method: "POST",
        path: `/startGame`,
      }),

    pauseGame: () =>
      this.client.request({
        method: "POST",
        path: `/pauseGame`,
      }),
    resumeGame: () =>
      this.client.request({
        method: "POST",
        path: `/resumeGame`,
      }),
  };

  client = new Nes.Client(`ws://${window.location.hostname}:8000/`);

  componentDidMount() {
    this.client
      .connect()
      .then(() => {
        this.setState({
          connected: true,
        });
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          actions: this.actions,
          client: this.client,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, Store, connect, ConnectProps };
