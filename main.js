
const $buttons = document.querySelectorAll('.button');
const $logsDiv = document.querySelector('#logs');

function getRandomNum(num, dmgLevel) {
	return Math.ceil(Math.random() * num) * dmgLevel;
};

function getLog(firstPerson, secondPerson, damageHP, health) {
	const logs = [
		`${firstPerson} вспомнил что-то важное, но неожиданно ${secondPerson}, не помня себя от испуга, ударил в предплечье врага. -${damageHP}, [${health}]`,
		`${firstPerson} поперхнулся, и за это ${secondPerson} с испугу приложил прямой удар коленом в лоб врага. -${damageHP}, [${health}]`,
		`${firstPerson} забылся, но в это время наглый ${secondPerson}, приняв волевое решение, неслышно подойдя сзади, ударил. - ${damageHP}, [${health}]`,
		`${firstPerson} пришел в себя, но неожиданно ${secondPerson} случайно нанес мощнейший удар. - ${damageHP}, [${health}]`,
		`${firstPerson} поперхнулся, но в это время ${secondPerson} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damageHP}, [${health}]`,
		`${firstPerson} удивился, а ${secondPerson} пошатнувшись влепил подлый удар. -${damageHP}, [${health}]`,
		`${firstPerson} высморкался, но неожиданно ${secondPerson} провел дробящий удар. -${damageHP}, [${health}]`,
		`${firstPerson} пошатнулся, и внезапно наглый ${secondPerson} беспричинно ударил в ногу противника -${damageHP}, [${health}]`,
		`${firstPerson} расстроился, как вдруг, неожиданно ${secondPerson} случайно влепил стопой в живот соперника. -${damageHP}, [${health}]`,
		`${firstPerson} пытался что-то сказать, но вдруг, неожиданно ${secondPerson} со скуки, разбил бровь сопернику. -${damageHP}, [${health}]`
	];

	return logs[getRandomNum(logs.length, 1) - 1];
}

function getHealth(dmgHP, HP) {
	return [dmgHP, HP].join(' / ');
};

function renderHpLife() {
	this.elHp.innerHTML = getHealth(this.damageHP, this.defaultHP);
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

	const health = getHealth(this.damageHP, this.defaultHP);
	const log = this === enemy ? getLog(this.name, character.name, count, health) : getLog(this.name, enemy.name, count, health);

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

function renderClickCounter(button) {
	const $button = button.elButton;
	if (button.leftClick === 0) {
		$button.disabled = true;
		$button.innerHTML = 'Kick are over';
		$button.after(p);
	}
}

function getClickCount(button) {
	button.clickCount += 1;
	button.leftClick -= 1;
	console.log(button.clickCount, button.leftClick);
};


const handleClick = ({ target: { id } }) => {
	const button = buttons[id];
	console.log(buttons, id);

	const dmgLevel = Number(id.slice(-1));

	getClickCount(button);

	const count = button.kick(20, dmgLevel);

	character.changeHP(count);
	enemy.changeHP(count);
	renderClickCounter(button)
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
	kick: getRandomNum,
	clickCount: 0,
	leftClick: 3,
};

const createButton = (id) => {
	const newButton = Object.create(damageLevel);
	newButton.elButton = document.querySelector(`#${id}`);
	return newButton;
};

const buttons = {
	"btn-kick-1": createButton("btn-kick-1"),
	"btn-kick-2": createButton("btn-kick-2"),
}

const init = () => {
	character.renderHP();
	enemy.renderHP();
};

init();
