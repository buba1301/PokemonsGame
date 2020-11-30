export function getRandomId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const toCapitalizeFirstLetter = (str) => {
  const capital = str.slice(0, 1).toUpperCase();
  const subStr = str.slice(1);
  return `${capital}${subStr}`;
};
