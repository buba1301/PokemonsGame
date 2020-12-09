import Game from './classes/Game.js';
import './style.css';

export default () => {
  const game = new Game();
  game.startGame();
};
