import Game from './classes/Game.js';

import getPokemons from './pokemons.js';

const initialsState = {
  pokemons: [],
  player1: {},
  buttons1: [],
  player2: {},
  buttons2: [],
  isPlayer1: true,
  buttonsDisabled: false,
  gameStatus: 'run',
};

export default () => {
  const game = new Game({ ...initialsState });
  game.startGame();
};

// getPokemons()
