interface Controls {
  up: string;
  down: string;
}

interface PongPlayer {
  [key: string]: {
    addControls: (controls: Controls) => void;
    keyboard: {
      setKeyState: (key: string, keyPressed: boolean) => void;
    };
    move: (int: number) => void;
  };
}
interface Pong {
  players: PongPlayer;
  start: () => void;
  on: (event: string, cb: (event: Event) => void) => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}
