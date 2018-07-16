import "./global.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

// const client = new Nes.Client("ws://10.100.52.166:8000");

// const start = async () => {
//   await client.connect();
//   const handler = playerNumber => (update, flags) => {
//     // update -> { id: 5, status: 'complete' }
//     // Second publish is not received (doesn't match)
//     pong.players[playerNumber].keyboard.setKeyState(
//       "up",
//       update.event === "up_press"
//     );
//     pong.players[playerNumber].keyboard.setKeyState(
//       "down",
//       update.event === "down_press"
//     );
//   };

//   client.subscribe("/player/1", handler("a"));
//   client.subscribe("/player/2", handler("b"));
//   client.subscribe("/player/3", handler("c"));
//   client.subscribe("/player/4", handler("d"));
// };

// start();

// console.log(pong.players);

// // Add keyboard controls
// pong.players.a.addControls({
//   up: "up",
//   down: "down"
// });
// pong.players.b.addControls({
//   up: "up",
//   down: "down"
// });
// pong.players.c.addControls({
//   up: "up",
//   down: "down"
// });
// pong.players.d.addControls({
//   up: "up",
//   down: "down"
// });

// function setAIBehaviorForPlayer(playerName: string) {
//   // Add behaviour for player B
//   pong.on("update", function() {
//     if (Math.random() > 0.8) return;
//     if (pong.players[playerName].y < pong.balls[0].y) {
//       pong.players[playerName].move(1);
//     } else if (pong.players[playerName].y > pong.balls[0].y) {
//       pong.players[playerName].move(-1);
//     }
//   });
// }

// setAIBehaviorForPlayer("a");
// setAIBehaviorForPlayer("b");
// setAIBehaviorForPlayer("c");
// setAIBehaviorForPlayer("d");

// async function doSocket() {
// const client = new Nes.Client('ws://df8e47a1.ngrok.io');

//   await client.connect();
//   const handler = (update: any, flags: any) => {
//     // console.log(update);
//     setP2Velocity(update);
//   };

//   client.subscribe('/action', handler);
// }

// doSocket();
