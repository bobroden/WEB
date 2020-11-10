let labMatrix = [];

document.querySelector('.enter').addEventListener('click', () => {
	document.querySelector('.aut').classList.add('hidden');
	document.querySelector('.main-game').classList.remove('hidden');
});

function check() {
	let num1 = +document.querySelector('.X').value;
    let num2 = +document.querySelector('.Y').value;
    if((num1 <= 30 && num1 >= 5 && num1 % 1 === 0) && (num2 <= 30 && num2 >= 5 && num2 % 1 === 0)) {
        document.querySelector('.help').classList.add('vissible');
        document.querySelector('.canvas-game').setAttribute('width', 30 * num1);
        document.querySelector('.canvas-game').setAttribute('height', 30 * num2);
        for(let i = 0; i < num1; i++) {
    		labMatrix[i] = [];
    		for(let j = 0; j < num2; j++) {
        		labMatrix[i][j] = 0;
    		}
		}
		let canvas = document.querySelector('.canvas-game');
		let context = canvas.getContext("2d");
		for (let x = 0.5; x < 30 * num1; x += 30) {
			context.moveTo(x, 0);
			context.lineTo(x, 30 * num2);
		}
		for (var y = 0.5; y < 30 * num2; y += 30) {
			context.moveTo(0, y);
			context.lineTo(30 * num1, y);
		}
		context.setLineDash([2, 3]);
		context.strokeStyle = "#C4C4C4";
		context.stroke();
    }
    else {
        document.querySelector('.help').classList.remove('vissible');
    }
}

document.querySelector('.X').addEventListener('input', check);

document.querySelector('.Y').addEventListener('input', check);

function Player(x, y, a, b) {
  this.x = x;
  this.y = y;
  this.a = a;
  this.b = b;

  this.Up = function() {
  	this.b--;
  	this.y -= 30;
  }
  this.Right = function() {
  	this.a++;
  	this.x += 30;
  }
  this.Down = function() {
  	this.b++;
  	this.y += 30;
  }
  this.Left = function() {
  	this.a--;
  	this.x -= 30;
  }
}

function Cell(top, right, bottom, left) {
	this.top = top;
  	this.right = right;
  	this.bottom = bottom;
  	this.left = left;
}

function drawCell(Cell, Player) {
	let canvas = document.querySelector('.canvas-game');
	let context = canvas.getContext("2d");
	if(Cell.top) {
		context.moveTo(Player.x, Player.y);
		context.lineTo(Player.x + 30, Player.y);
	}
	if(Cell.right) {
		context.moveTo(Player.x + 30, Player.y);
		context.lineTo(Player.x + 30, Player.y + 30);
	}
	if(Cell.bottom) {
		context.moveTo(Player.x, Player.y + 30);
		context.lineTo(Player.x + 30, Player.y + 30);
	}
	if(Cell.left) {
		context.moveTo(Player.x, Player.y);
		context.lineTo(Player.x, Player.y + 30);
	}
	context.strokeStyle = "#000";
	context.stroke();
	//labMatrix[Player.x][Player.y] = Cell;
}

function drawPlayer(Player) {
	let canvas = document.querySelector('.canvas-game');
	let context = canvas.getContext("2d");
	context.beginPath();
	context.arc(Player.x + 15, Player.y + 15, 10, 0, 2*Math.PI, false);
	context.fillStyle = 'blue';
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'blue';
	context.stroke();
}

function clearPlayer(Player) {
	let canvas = document.querySelector('.canvas-game');
	let context = canvas.getContext("2d");
	context.clearRect(Player.x + 1, Player.y + 1, 29, 29);
}

document.querySelector('.Up').addEventListener('click', () => {
	clearPlayer(palyer1);
})

let palyer1 = new Player(0, 0, 0, 0);
let cell1 = new Cell(true, true, true, false);
drawCell(cell1, palyer1);
drawPlayer(palyer1);
