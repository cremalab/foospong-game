import React, { Component, createContext } from "react";
import Nes from "nes";
import connect, { ConnectProps } from "./connect";

const Context = createContext({});

const { Provider, Consumer } = Context;

export interface State {
  readonly connected: boolean;
  readonly playerNumber?: string;
}

class Store extends Component<any, State> {
  readonly state: State = {
    connected: false
  };

  actions = {
    sendController: event => () =>
      this.client.request({
        method: "POST",
        path: `/player/${this.state.playerNumber}`,
        payload: {
          event
        }
      }),
    setPlayer: (playerNumber: string) => {
      this.setState({
        playerNumber
      });
    },
    startGame: () =>
      this.client.request({
        method: "POST",
        path: `/startGame`
      })
  };

  client = new Nes.Client(process.env.REACT_APP_SOCKET_URL);

  componentDidMount() {
    this.client
      .connect()
      .then(() => {
        this.setState({
          connected: true
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
          client: this.client
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, Store, connect, ConnectProps };
