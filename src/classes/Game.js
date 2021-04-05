/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import { getRandomId } from '../utils.js';
import Pokemon from './pokemon.js';
import Buttons from './buttons.js';
import getLog from '../log.js';

class Game {
  constructor({ pokemons, isPlayer1, player1, player2, buttonsDisabled, gameStatus }) {
    this.pokemons = pokemons;
    this.isPlayer1 = isPlayer1;
    this.buttonsDisabled = buttonsDisabled;
    this.player1 = player1;
    this.player2 = player2;
    this.gameStatus = gameStatus;
  }

  startGame = () => {
    const { pokemons } = this;
    this.isPlayer1 = true;
    this.buttonsDisabled = false;

    const [beginRandomIndex, endRandomIndex] = this.generateRandomIds(pokemons);

    if (this.gameStatus === 'continue') {
      const player1 = pokemons[this.player1.id];
      this.player1 = new Pokemon({ ...player1, selectors: 'character' });
      this.isPlayer1 = true;
    } else {
      this.player1 = this.generatePlayer(beginRandomIndex, endRandomIndex, 'character');
    }

    this.player2 = this.generatePlayer(beginRandomIndex, endRandomIndex, 'enemy');

    this.buttons1 = this.generateButtons(this.player1);
    this.buttons2 = this.generateButtons(this.player2);

    this.player1.renderButtons(!this.isPlayer1);
    this.player1.renderHP();

    this.player2.renderButtons(this.isPlayer1);
    this.player2.renderHP();

    this.generateEventListners();
  };

  generateRandomIds = (pokemons) => {
    const beginRandomId = 0;
    const endRandomId = Object.keys(pokemons).length - 1;
    return [beginRandomId, endRandomId];
  };

  generatePlayer = (beginRandomId, endRandomId, role) => {
    const { pokemons } = this;

    const pokemonId = getRandomId(beginRandomId, endRandomId);
    const props = { ...pokemons[pokemonId], selectors: role };

    return new Pokemon({ ...props });
  };

  generateButtons = (player) => player.attacks.map((attack) => new Buttons({ ...attack }));

  generateEventListners = () => {
    const $buttons = document.querySelectorAll('.button');

    const handleClick = ({ target: { id } }) => {
      this.buttonActions(id, $buttons);
    };

    $buttons.forEach(($button) => $button.addEventListener('click', handleClick));
  };

  buttonActions = (id, $buttons) => {
    const { buttons1, buttons2, isPlayer1, player1, player2 } = this;

    const player = isPlayer1 ? player1 : player2;
    const oponent = isPlayer1 ? player2 : player1;

    const currentButton = [...buttons1, ...buttons2].find((button) => button.name === id);

    const count = currentButton.kickPoints();

    currentButton.renderClickCounter();

    this.gameStatus = oponent.changeHP(count, $buttons, () =>
      getLog(player.name, oponent.name, count),
    );

    if (this.gameStatus === 'finish') {
      isPlayer1 ? player2.renderResetButton('continue') : player1.renderResetButton('reset');
      this.resetGame($buttons);
    } else {
      this.changePlayer();
    }
  };

  changePlayer = () => {
    this.isPlayer1 = !this.isPlayer1;
    this.buttonsDisabled = !this.buttonsDisabled;
    this.player1.disabledButtons(this.buttonsDisabled);
    this.player2.disabledButtons(!this.buttonsDisabled);
  };

  handleClickButtonReset = ($button, gameStatus) => {
    $button.addEventListener('click', () => {
      this.gameStatus = gameStatus;
      this.startGame();
      $button.remove();
    });
  };

  resetGame = ($buttons) => {
    $buttons.forEach(($button) => $button.remove());
    const $logsDiv = document.querySelector('#logs');
    const $buttonReset = document.getElementById('reset');
    const $buttonContinue = document.getElementById('continue');

    if ($buttonReset) {
      this.handleClickButtonReset($buttonReset, 'run');
    } else {
      this.handleClickButtonReset($buttonContinue, 'continue');
    }
    $logsDiv.remove();
    const $body = document.querySelector('.body');
    const $newLog = document.createElement('div');

    $newLog.setAttribute('id', 'logs');
    $newLog.classList.add('logs');
    $body.appendChild($newLog);
  };
}

export default Game;
