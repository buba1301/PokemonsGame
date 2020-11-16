// Задача 1

const firstStr = prompt('Введите первую строку');
const secondStr = prompt('Введите вторую строку');
const letter = prompt('Какую букву найти?');


const getLetterQuantity = (str, letter) => {
	let res = 0;

	for (let i = 0; i < str.length; i += 1) {
		str.charAt(i) === letter ? res += 1 : res;
	}

	return res;
};

const getRow = (firstStr, secondStr, letter) => {
	const firstRow = getLetterQuantity(firstStr, letter);
	const secondRow = getLetterQuantity(secondStr, letter);

	return firstRow > secondRow ? firstStr : secondStr;
}

const result = getRow(firstStr, secondStr, letter);

alert(`В этой строке ${result} больше букв ${letter}`);

// Задача 2
const tel = prompt('Введите номер телефона');

const firstItem = ['+', '7', '8', '9'];

const convertTel = (tel) => {
	let telephone = '';
	let res = '';
	if (tel.length < 10 || tel.length > 12 || !firstItem.includes(tel.charAt(0))) {
		res = 'Не верный формат телефона';
		return res;
	}

	if (tel.length === 10) {
		telephone += '+7' + tel;
	} else if (tel.length === 11) {
		telephone = '+7' + tel.slice(1);
	} else {
		telephone = tel;
	}

	for (let i = 0; i < telephone.length; i += 1) {
		const item = telephone.charAt(i);

		if (i === 2) {
			res += ' ' + '(' + item;
		} else if (i === 4) {
			res += item + ')';
		} else if (i === 5) {
			res += ' ' + item;
		} else if (i === 7 || i === 9) {
			res += item + '-';
		} else {
			res += item;
		}
	}
	return res;
}

const result = convertTel(tel);

alert(result);
