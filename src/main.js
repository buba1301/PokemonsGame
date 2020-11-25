/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import getLog from './log.js';
import Pokemon from './classes/pokemon.js';
import Buttons from './classes/buttons.js';

const player1 = new Pokemon({
  name: 'Pikachu',
  hp: 100,
  type: 'electric',
  selectors: 'character',
});

const player2 = new Pokemon({
  name: 'Charmander',
  hp: 100,
  type: 'fire',
  selectors: 'enemy',
});

const buttons = {
  'btn-kick-1-player-1': new Buttons({
    maxClick: 6,
    leftClick: 6,
    dmgLevel: 1,
    selectors: {
      buttonId: 1,
      playerId: 1,
    },
  }),
  'btn-kick-2-player-1': new Buttons({
    maxClick: 3,
    leftClick: 3,
    dmgLevel: 2,
    selectors: {
      buttonId: 2,
      playerId: 1,
    },
  }),
  'btn-kick-1-player-2': new Buttons({
    maxClick: 6,
    leftClick: 6,
    dmgLevel: 1,
    selectors: {
      buttonId: 1,
      playerId: 2,
    },
  }),
  'btn-kick-2-player-2': new Buttons({
    maxClick: 3,
    leftClick: 3,
    dmgLevel: 2,
    selectors: {
      buttonId: 2,
      playerId: 2,
    },
  }),
};

const state = {
  isPlayers1: true,
};

const $buttons = document.querySelectorAll('.button');

function buttonsDisabled() {
  $buttons.forEach(($button) => ($button.disabled = true));
}

const handleClick = ({ target: { id } }) => {
  const button = buttons[id];
  const count = button.kickPoints();

  const name1 = player1.name;
  const name2 = player2.name;

  if (state.isPlayers1) {
    player2.changeHP(count, buttonsDisabled, () => getLog(name2, name2, count));
  } else {
    player1.changeHP(count, buttonsDisabled, () => getLog(name1, name2, count));
  }
  button.renderClickCounter();
  state.isPlayers1 = !state.isPlayers1;
};

$buttons.forEach(($button) => $button.addEventListener('click', handleClick));

export default () => {
  player1.renderHP();
  player2.renderHP();
};
