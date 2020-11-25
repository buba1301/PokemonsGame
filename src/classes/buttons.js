import getRandomNum from '../utils.js';

class Selectors {
  constructor({ buttonId, playerId }) {
    this.elButton = document.getElementById(`btn-kick-${buttonId}-player-${playerId}`);
    this.spanEl = document.getElementById(`count-kick-${buttonId}-player-${playerId}`);
  }
}

class Buttons extends Selectors {
  constructor({ maxClick, leftClick, dmgLevel, selectors }) {
    super(selectors);
    this.maxClick = maxClick;
    this.leftClick = leftClick;
    this.dmgLevel = dmgLevel;
  }

  kickPoints = () => getRandomNum(20, this.dmgLevel);

  renderClickCounter = () => {
    this.leftClick -= 1;

    const { elButton, spanEl, leftClick, maxClick } = this;

    if (leftClick === 0) {
      elButton.disabled = true;
      spanEl.innerHTML = 'Kick are over';
    } else {
      spanEl.innerHTML = `${leftClick} / ${maxClick}`;
    }
  };
}

export default Buttons;
