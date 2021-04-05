import { getRandomId } from './utils.js';

function getLog(firstPerson, secondPerson, damageHP) {
  const logs = [
    `${firstPerson} вспомнил что-то важное, но неожиданно ${secondPerson}, не помня себя от испуга, ударил в предплечье врага. -${damageHP}`,
    `${firstPerson} поперхнулся, и за это ${secondPerson} с испугу приложил прямой удар коленом в лоб врага. -${damageHP}`,
    `${firstPerson} забылся, но в это время наглый ${secondPerson}, приняв волевое решение, неслышно подойдя сзади, ударил. - ${damageHP}`,
    `${firstPerson} пришел в себя, но неожиданно ${secondPerson} случайно нанес мощнейший удар. - ${damageHP}`,
    `${firstPerson} поперхнулся, но в это время ${secondPerson} нехотя раздробил кулаком <вырезанно цензурой> противника. -${damageHP}`,
    `${firstPerson} удивился, а ${secondPerson} пошатнувшись влепил подлый удар. -${damageHP}`,
    `${firstPerson} высморкался, но неожиданно ${secondPerson} провел дробящий удар. -${damageHP}`,
    `${firstPerson} пошатнулся, и внезапно наглый ${secondPerson} беспричинно ударил в ногу противника -${damageHP}`,
    `${firstPerson} расстроился, как вдруг, неожиданно ${secondPerson} случайно влепил стопой в живот соперника. -${damageHP}`,
    `${firstPerson} пытался что-то сказать, но вдруг, неожиданно ${secondPerson} со скуки, разбил бровь сопернику. -${damageHP}`,
  ];

  return logs[getRandomId(logs.length, 1) - 1];
}

export default getLog;
