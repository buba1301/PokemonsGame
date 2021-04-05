class Selectors {
  constructor(name) {
    this.elHp = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
  }

  getHealth = (current, total) => [current, total].join(' / ');

  getPercent = (current, total) => (current * 100) / total;

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

  renderLog = (cb) => {
    const log = cb();

    const $p = document.createElement('p');
    const $logsDiv = document.querySelector('#logs');
    $p.innerHTML = log;

    const [$lastElem] = $logsDiv.children;
    $logsDiv.insertBefore($p, $lastElem);
  };

  renderHP = () => {
    this.renderHpLife();
    this.renderProgressbar();
  };

  changeHP = (count, buttonsDisabled, cb) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert(`${this.name} is died!!`);
      buttonsDisabled();
    }

    this.renderHP();
    this.renderLog(cb);
  };
}

export default Pokemon;
