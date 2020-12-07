/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import Pokemon from './pokemon.js';
import Buttons from './buttons.js';
import getLog from '../log.js';
import Routes from './Routes.js';
import getPokemons from '../pokemons.js';

class Game {
  constructor() {
    this.pokemons = {};
    this.isPlayer1 = true;
    this.buttonsDisabled = false;
    this.player1 = {};
    this.player2 = {};
    this.gameStatus = 'run';
    this.routes = {};
  }

  startGame = async () => {
    const { pokemons } = this;

    this.routes = new Routes();

    const data = await this.routes.getData('getPokemons');

    this.pokemons = getPokemons(data);

    this.isPlayer1 = true;
    this.buttonsDisabled = false;

    if (this.gameStatus === 'continue') {
      const player1 = pokemons[this.player1.id];

      this.player1 = new Pokemon({ ...player1, selectors: 'character' });
    } else {
      this.player1 = await this.generatePlayer('character');
    }

    this.player2 = await this.generatePlayer('enemy');

    this.buttons1 = this.generateButtons(this.player1);
    this.buttons2 = this.generateButtons(this.player2);

    this.player1.renderButtons(!this.isPlayer1);
    this.player1.renderHP();

    this.player2.renderButtons(this.isPlayer1);
    this.player2.renderHP();

    this.generateEventListners();
  };

  generatePlayer = async (role) => {
    const randomPokemon = await this.routes.getData('getPokemons', { random: true });

    const props = { ...randomPokemon, selectors: role };

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

  buttonActions = async (id, $buttons) => {
    const { buttons1, buttons2, isPlayer1, player1, player2 } = this;

    const player = isPlayer1 ? player1 : player2;
    const oponent = isPlayer1 ? player2 : player1;

    const currentButton = [...buttons1, ...buttons2].find((button) => button.name === id);

    const query = {
      player1id: this.player1.id,
      player2id: this.player2.id,
      attackId: currentButton.id,
    };

    const { kick } = await this.routes.getData('getFight', query);
    const count = isPlayer1 ? kick.player1 : kick.player2;

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
