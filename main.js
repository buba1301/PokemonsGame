const $buttons = document.querySelectorAll('.button');

const getRandomNum = (num) => {
	return Math.ceil(Math.random() * num);
};

const character = {
	name: 'Pikachu',
	defaultHP: 100,
	damageHP: 100,
	elHp: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
	name: 'Charmander',
	defaultHP: 100,
	damageHP: 100,
	elHp: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
};

const damageLevel = {
	'btn-kick-1': () => getRandomNum(20),
	'btn-kick-2': () => getRandomNum(20) * 2,
}

const renderHpLife = (person) => {
	person.elHp.innerHTML = [person.damageHP, person.defaultHP].join(' / ');
};

const renderProgressbar = (person) => {
	person.elProgressbar.style.width = person.damageHP + '%';
};

const renderHP = (person) => {
	renderHpLife(person);
	renderProgressbar(person);
}

const buttonsDisabled = () => {
	$buttons.forEach(($button) => $button.disabled = true);
}

const changeHP = (count, person, $button) => {
	if (person.damageHP < count) {
		person.damageHP = 0;
		alert(person.name + ' is died!!');
		buttonsDisabled();
	} else {
		person.damageHP -= count;
	}
	renderHpLife(person);
	renderProgressbar(person);
};

const handleClick = (e) => {
	const $buttonId = e.target.id;
	changeHP(damageLevel[$buttonId](), character);
	changeHP(damageLevel[$buttonId](), enemy);
};

$buttons.forEach(($button) => $button.addEventListener('click', handleClick));

const init = () => {
	renderHP(character);
	renderHP(enemy)
};

init()
