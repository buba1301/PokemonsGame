import { getRandomId } from '../utils.js';

class Buttons {
  constructor({ name, maxDamage, minDamage, maxCount }) {
    this.name = name;
    this.maxDamage = maxDamage;
    this.minDamage = minDamage;
    this.maxCount = maxCount;
  }

  kickPoints = () => getRandomId(this.minDamage, this.maxCount);

  renderClickCounter = () => {
    const elButton = document.getElementById(this.name);
    const spanEl = document.querySelector(`span[name="count-${this.name}"]`);

    this.maxCount -= 1;

    if (this.maxCount === 0) {
      spanEl.innerHTML = `(${this.maxCount})`;
      elButton.remove(); // TODO делать дисейбл ?? перекрывается с общим дисейблом при перходе хода
    } else {
      spanEl.innerHTML = `(${this.maxCount})`;
    }
  };
}

export default Buttons;
