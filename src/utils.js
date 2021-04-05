function getRandomNum(num, dmgLevel) {
  return Math.ceil(Math.random() * num) * dmgLevel;
}

export default getRandomNum;
