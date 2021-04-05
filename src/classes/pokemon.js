import { toCapitalizeFirstLetter } from '../utils.js';

class Selectors {
  constructor(name) {
    this.elHp = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.elImage = document.getElementById(`image-${name}`);
    this.elName = document.getElementById(`name-${name}`);
    this.elControl = document.getElementById(`control-${name}`);
  }
}
class Pokemon extends Selectors {
  constructor({ id, name, hp, type, img, attacks, selectors }) {
    super(selectors);
    this.id = id;
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.img = img;
    this.attacks = attacks;
  }

  getHealth = (current, total) => [current, total].join(' / ');

  getPercent = (current, total) => (current * 100) / total;

  renderName = () => {
    const { elName, name } = this;
    elName.innerHTML = name;
  };

  renderImage = () => {
    const { elImage, img } = this;
    elImage.removeAttribute('src');
    elImage.setAttribute('src', img);
  };

  renderHpLife = () => {
    const {
      elHp,
      hp: { current, total },
    } = this;
    elHp.innerHTML = this.getHealth(current, total);
  };

  renderProgressbar = () => {
    const {
      elProgressbar,
      hp: { current, total },
    } = this;
    const percent = this.getPercent(current, total);
    elProgressbar.style.width = `${percent}%`;
  };

  renderButtons = (isPlayer1) => {
    const { attacks, elControl } = this;
    attacks.forEach(({ name, maxCount }) => {
      const $button = document.createElement('button');
      const $span = document.createElement('span');

      $button.classList.add('button');
      $button.setAttribute('id', name);
      $button.innerHTML = toCapitalizeFirstLetter(name);
      $button.disabled = isPlayer1;

      $span.setAttribute('id', name);
      $span.setAttribute('name', `count-${name}`);
      $span.innerHTML = ` (${maxCount})`;

      $button.appendChild($span);
      elControl.appendChild($button);
    });
  };

  renderResetButton = (name) => {
    const $resetButton = document.createElement('button');
    $resetButton.classList.add('button');
    $resetButton.setAttribute('id', name);
    $resetButton.innerHTML = name;

    this.elControl.appendChild($resetButton);
  };

  renderLog = (cb) => {
    const log = cb();

    const $p = document.createElement('p');

    const $logsDiv = document.querySelector('#logs');
    $logsDiv.setAttribute('id', 'logs');

    $p.innerHTML = log;

    const [$lastElem] = $logsDiv.children;
    $logsDiv.insertBefore($p, $lastElem);
  };

  renderHP = () => {
    this.renderName();
    this.renderImage();
    this.renderHpLife();
    this.renderProgressbar();
  };

  changeHP = (count, $buttons, cb) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      this.renderHP();
      $buttons.forEach((button) => (button.disabled = true));
      return 'finish';
    }
    this.renderHP();
    this.renderLog(cb);
    return 'fight';
  };

  disabledButtons = (isButtonDisabled) => {
    const $buttons = this.elControl.childNodes;
    $buttons.forEach((button) => (button.disabled = isButtonDisabled));
  };
}

export default Pokemon;
