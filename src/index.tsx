import './global.css';
// import Nes from 'nes';
import Pong from './pong/Pong.js';

console.dir(Pong);

var pong = new Pong(document.getElementById('root'));

// Add keyboard controls
// pong.players.a.addControls({
//   'up': 'q',
//   'down': 'a',
// });
// pong.players.b.addControls({
//   'up': 'w',
//   'down': 's',
// });
// pong.players.c.addControls({
//   'up': 'e',
//   'down': 'd',
// });
// pong.players.d.addControls({
//   'up': 'up',
//   'down': 'down',
// });

function setAIBehaviorForPlayer(playerName: string) {
  // Add behaviour for player B
  pong.on('update', function () {
    if (Math.random() > 0.8) return;
    if (pong.players[playerName].y < pong.balls[0].y) {
      pong.players[playerName].move(1);
    } else if (pong.players[playerName].y > pong.balls[0].y) {
      pong.players[playerName].move(-1);
    }
  });
}

setAIBehaviorForPlayer('a');
setAIBehaviorForPlayer('b');
setAIBehaviorForPlayer('c');
setAIBehaviorForPlayer('d');
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
