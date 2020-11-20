
const $buttons = document.querySelectorAll('.button');
const $logsDiv = document.querySelector('#logs');

function getRandomNum(num, dmgLevel) {
	return Math.ceil(Math.random() * num) * dmgLevel;
};

function getLog(firstPerson, secondPErson) {
	const logs = [
		`${firstPerson} вспомнил что-то важное, но неожиданно ${secondPErson}, не помня себя от испуга, ударил в предплечье врага.]`,
		`${firstPerson} поперхнулся, и за это ${secondPErson} с испугу приложил прямой удар коленом в лоб врага.`,
		`${firstPerson} забылся, но в это время наглый ${secondPErson}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
		`${firstPerson} пришел в себя, но неожиданно ${secondPErson} случайно нанес мощнейший удар.`,
		`${firstPerson} поперхнулся, но в это время ${secondPErson} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
		`${firstPerson} удивился, а ${secondPErson} пошатнувшись влепил подлый удар.`,
		`${firstPerson} высморкался, но неожиданно ${secondPErson} провел дробящий удар.`,
		`${firstPerson} пошатнулся, и внезапно наглый ${secondPErson} беспричинно ударил в ногу противника`,
		`${firstPerson} расстроился, как вдруг, неожиданно ${secondPErson} случайно влепил стопой в живот соперника.`,
		`${firstPerson} пытался что-то сказать, но вдруг, неожиданно ${secondPErson} со скуки, разбил бровь сопернику.`
	];

	return logs[getRandomNum(logs.length, 1) - 1];
}

function renderHpLife() {
	this.elHp.innerHTML = [this.damageHP, this.defaultHP].join(' / ');
};

function renderProgressbar() {
	const persent = this.damageHP * 100 / this.defaultHP;
	this.elProgressbar.style.width = persent + '%';
};

function renderHP() {
	this.renderHpLife();
	this.renderProgressbar();
};

function buttonsDisabled() {
	$buttons.forEach(($button) => $button.disabled = true);
};

function changeHP(count) {
	this.damageHP -= count;

	const log = this === enemy ? getLog(this.name, character.name) : getLog(this.name, enemy.name);

	if (this.damageHP <= 0) {
		this.damageHP = 0;
		alert(this.name + ' is died!!');
		buttonsDisabled();
	}
	this.renderHP();
	$p = document.createElement('p');
	$p.innerHTML = log;

	const [$lastElem] = $logsDiv.children;
	$logsDiv.insertBefore($p, $lastElem);
};

const handleClick = ({ target: { id } }) => {
	const dmgLevel = Number(id.slice(-1));

	const count = damageLevel[id](20, dmgLevel);
	character.changeHP(count);
	enemy.changeHP(count);
};

$buttons.forEach(($button) => $button.addEventListener('click', handleClick));

const character = {
	name: 'Pikachu',
	defaultHP: 100,
	damageHP: 100,

	elHp: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),

	renderHpLife: renderHpLife,
	renderProgressbar: renderProgressbar,
	renderHP: renderHP,
	changeHP: changeHP,
};

const enemy = {
	name: 'Charmander',
	defaultHP: 100,
	damageHP: 100,

	elHp: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),

	renderHpLife: renderHpLife,
	renderProgressbar: renderProgressbar,
	renderHP: renderHP,
	changeHP: changeHP,
};

const damageLevel = {
	'btn-kick-1': getRandomNum,
	'btn-kick-2': getRandomNum,
};

const init = () => {
	character.renderHP();
	enemy.renderHP();
};

init();
