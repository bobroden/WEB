
document.querySelector('.enter').addEventListener('click', () => {
	document.querySelector('.aut').classList.add('hidden');
	document.querySelector('.main-game').classList.remove('hidden');
});

function check() {
	main_Width = document.body.clientWidth;
	let num1 = +document.querySelector('.X').value;
    let num2 = +document.querySelector('.Y').value;
    if((num1 <= 30 && num1 >= 5 && num1 % 1 === 0) && (num2 <= 30 && num2 >= 5 && num2 % 1 === 0)) {
        document.querySelector('.help').classList.add('vissible');
        document.querySelector('.canvas-game').setAttribute('width', 30 * num1);
        document.querySelector('.canvas-game').setAttribute('height', 30 * num2);
    }
    else {
        document.querySelector('.help').classList.remove('vissible');
    }
}

document.querySelector('.X').addEventListener('input', check);

document.querySelector('.Y').addEventListener('input', check);