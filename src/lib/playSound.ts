const context = new AudioContext();

const play = (frequencyValue: number, timeout: number = 10) => {
  const fade = 0.2;
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  oscillator.type = "sawtooth";
  oscillator.frequency.value = frequencyValue;

  gainNode.connect(context.destination);
  gainNode.gain.setValueAtTime(0.5, context.currentTime);
  oscillator.start();
  setTimeout(() => {
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + fade
    );
    oscillator.stop(context.currentTime + fade);
  }, timeout);
};

export default play;
