const $buttons = document.querySelectorAll('.button');

function getRandomNum(dmgLevel) {
	return Math.ceil(Math.random() * this.lifePoitns) * dmgLevel;
};

function renderHpLife() {
	this.elHp.innerHTML = [this.damageHP, this.defaultHP].join(' / ');
};

function renderProgressbar() {
	this.elProgressbar.style.width = this.damageHP + '%';
};

function renderHP() {
	this.renderHpLife();
	this.renderProgressbar();
};

function buttonsDisabled() {
	$buttons.forEach(($button) => $button.disabled = true);
};

function changeHP(count) {
	if (this.damageHP < count) {
		this.damageHP = 0;
		alert(this.name + ' is died!!');
		buttonsDisabled();
	} else {
		this.damageHP -= count;
	}
	this.renderHpLife();
	this.renderProgressbar();
};

const handleClick = (e) => {
	const $buttonId = e.target.id;
	const dmgLevel = Number($buttonId.slice(-1));

	const count = damageLevel[$buttonId](dmgLevel);
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
	lifePoitns: 20,
	damageLevel1: 1,
	damageLevel2: 2,
	'btn-kick-1': getRandomNum,
	'btn-kick-2': getRandomNum,
}

const init = () => {
	character.renderHP();
	enemy.renderHP();
};

init();
