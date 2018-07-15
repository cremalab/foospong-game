import "./global.css";
// import Nes from 'nes';
import Pong from "./pong/Pong.js";
import Nes from "nes";

var pong = new Pong(document.getElementById("root"));
const client = new Nes.Client("ws://192.168.1.15:8000");

const start = async () => {
  await client.connect();
  const handler = playerNumber => (update, flags) => {
    // update -> { id: 5, status: 'complete' }
    // Second publish is not received (doesn't match)
    pong.players[playerNumber].keyboard.setKeyState(
      "up",
      update.event === "up_press"
    );
    pong.players[playerNumber].keyboard.setKeyState(
      "down",
      update.event === "down_press"
    );
  };

  Object.getOwnPropertyNames(pong.players).forEach((key, i) => {
    console.log(`${key} -> ${i + 1}`);
    client.subscribe(`/player/${i + 1}`, handler(key));
  });
};

start();

// Add keyboard controls
Object.getOwnPropertyNames(pong.players).forEach(key => {
  pong.players[key].addControls({
    up: "up",
    down: "down"
  });
});

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
