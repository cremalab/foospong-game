import React from "react";
import { Consumer, State } from "./";

export interface ConnectProps {
  actions: any;
  client: any;
  state: State;
}

interface InjectedProps {}

const connect = () => <TOriginalProps extends {}>(
  PassedComponent:
    | React.ComponentClass<TOriginalProps & InjectedProps>
    | React.StatelessComponent<TOriginalProps & InjectedProps>
) => {
  const Connect: React.SFC<any> = props => (
    <Consumer>
      {({ actions, client, state }: ConnectProps) => (
        <PassedComponent
          {...props}
          actions={actions}
          client={client}
          state={state}
        />
      )}
    </Consumer>
  );
  return Connect;
};

export default connect;
