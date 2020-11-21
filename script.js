let labMatrix = [];
let widthCell = 30;
let gaimly = false;

let move = 0; // temporarily!!!


let cell0 = new Cell(false, false, true, false);
let cell1 = new Cell(true, true, false, true);
let cell2 = new Cell(true, true, true, true);
let cell3 = new Cell(true, false, true, true);
let cell4 = new Cell(true, true, false, true);
let cell5 = new Cell(false, true, true, true);
let cell6 = new Cell(true, true, true, false);

let arrCells = [];
arrCells.push(cell0);
arrCells.push(cell1);
arrCells.push(cell2);
arrCells.push(cell3);
arrCells.push(cell4);
arrCells.push(cell5);
arrCells.push(cell6);

document.querySelector('.enter').addEventListener('click', () => {
	document.querySelector('.aut').classList.add('hidden');
	document.querySelector('.main-game').classList.remove('hidden');
});

function check() {
	let num1 = +document.querySelector('.X').value;
    let num2 = +document.querySelector('.Y').value;
    if((num1 <= widthCell && num1 >= 5 && num1 % 1 === 0) && (num2 <= widthCell && num2 >= 5 && num2 % 1 === 0)) {
        document.querySelector('.help').classList.add('vissible');
        document.querySelector('.canvas-game').setAttribute('width', widthCell * num1);
        document.querySelector('.canvas-game').setAttribute('height', widthCell * num2);
        for(let i = 0; i < num1; i++) {
    		labMatrix[i] = [];
    		for(let j = 0; j < num2; j++) {
        		labMatrix[i][j] = 0;
    		}
		}
		let canvas = document.querySelector('.canvas-game');
		let context = canvas.getContext("2d");

		/*context.fillStyle = '#CFF2DF';
		context.fillRect(0, 0, widthCell * num1, widthCell);
		context.fillRect(0, 0, widthCell, widthCell * num2);
		context.fillRect(0, widthCell * num2 - widthCell, widthCell * num1, widthCell);
		context.fillRect(widthCell * num1 - widthCell, 0, widthCell, widthCell * num2);*/

		for (let x = 0.5; x < widthCell * num1; x += widthCell) {
			context.moveTo(x, 0);
			context.lineTo(x, widthCell * num2);
		}
		for (var y = 0.5; y < widthCell * num2; y += widthCell) {
			context.moveTo(0, y);
			context.lineTo(widthCell * num1, y);
		}
		context.setLineDash([2, 3]);
		context.strokeStyle = "#C4C4C4";
		context.stroke();
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, widthCell * num2);
		context.moveTo(0, 0);
		context.lineTo(widthCell * num1, 0);
		context.moveTo(widthCell * num1, widthCell * num2);
		context.lineTo(0, widthCell * num2);
		context.moveTo(widthCell * num1, widthCell * num2);
		context.lineTo(widthCell * num1, 0);
		context.setLineDash([0, 0]);
		context.strokeStyle = "red";
		context.lineWidth = 3;
		context.stroke();

		document.querySelector('.canvas-game').addEventListener('click', startPosition);
		gaimly = true;
    }
    else {
        document.querySelector('.help').classList.remove('vissible');
        gaimly = false;
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
  	this.y -= widthCell;
  }
  this.Right = function() {
  	this.a++;
  	this.x += widthCell;
  }
  this.Down = function() {
  	this.b++;
  	this.y += widthCell;
  }
  this.Left = function() {
  	this.a--;
  	this.x -= widthCell;
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
	let a = Player.a;
	let b = Player.b;
	context.strokeStyle = 'white';
	context.beginPath();
	if(Cell.top && b !== 0) {
		context.moveTo(Player.x, Player.y);
		context.lineTo(Player.x + widthCell, Player.y);
	}
	if(Cell.right && a !== labMatrix[0].length - 1) {
		context.moveTo(Player.x + widthCell, Player.y);
		context.lineTo(Player.x + widthCell, Player.y + widthCell);
	}
	if(Cell.bottom && b !== labMatrix[0][0].length) {
		context.moveTo(Player.x, Player.y + widthCell);
		context.lineTo(Player.x + widthCell, Player.y + widthCell);
	}
	if(Cell.left && a !== 0) {
		context.moveTo(Player.x, Player.y);
		context.lineTo(Player.x, Player.y + widthCell);
	}
	context.strokeStyle = "#000";
	context.lineWidth = 2;
	context.stroke();
	labMatrix[Player.a][Player.b] = Cell;
}

function drawPlayer(Player) {
	let canvas = document.querySelector('.canvas-game');
	let context = canvas.getContext("2d");
	var img = document.querySelector('#figure');
  	//var pattern = context.createPattern(img, 'no-repeat');
  	/*context.beginPath();
  	context.fillStyle = pattern;
  	context.lineWidth = 0;
	context.arc(Player.x + 15, Player.y + 15, 10, 0, 2 * Math.PI, false);
	context.fill();
	//context.strokeStyle = 'blue';
	context.stroke();*/
	context.drawImage(img, Player.x + 3, Player.y + 3);
}

function clearPlayer(Player) {
	let canvas = document.querySelector('.canvas-game');
	let context = canvas.getContext("2d");
	context.clearRect(Player.x + 3, Player.y + 3, widthCell - 5, widthCell - 5); // maybe widthCell - 1;
}

let player;//= new Player(0, 0, 0, 0);
//let cell1 = new Cell(true, true, true, false);
//drawCell(cell1, palyer1);
//drawPlayer(palyer1);

function startPosition(e) {
	let gCanvasElement = document.querySelector('.canvas-game');
	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= gCanvasElement.offsetLeft;
	y -= gCanvasElement.offsetTop;
	let num1 = +document.querySelector('.X').value;
    let num2 = +document.querySelector('.Y').value;
    let canvas = document.querySelector('.canvas-game');
	let context = canvas.getContext("2d");
	if((x <= widthCell || y <= widthCell) || (x >= widthCell * (num1 - 1) || y >= widthCell * (num2 - 1))) {
		x = Math.floor(x / widthCell) * widthCell;
		y = Math.floor(y / widthCell) * widthCell;
		context.beginPath();
	}
	if(x < widthCell) {
		context.moveTo(x, y);
		context.lineTo(x, y + widthCell);
	}
	else if(y < widthCell) {
		context.moveTo(x, y);
		context.lineTo(x + widthCell, y);
	}
	else if(x === widthCell * (num1 - 1)) {
		context.moveTo(x + widthCell, y);
		context.lineTo(x + widthCell, y + widthCell);
	}
	else if(y === widthCell * (num2 - 1)) {
		context.moveTo(x, y + widthCell);
		context.lineTo(x + widthCell, y + widthCell);
	}
	context.strokeStyle = "white";
	context.lineWidth = 4;
	context.stroke();
	if((x <= widthCell || y <= widthCell) || (x >= widthCell * (num1 - 1) || y >= widthCell * (num2 - 1))) {
		document.querySelector('.canvas-game').removeEventListener('click', startPosition);
		player = new Player(x, y, Math.floor(x / widthCell), Math.floor(y / widthCell));
		drawPlayer(player);
		drawCell(arrCells[move], player); // temporarily!!!
	}
}

document.querySelector('.button-container').addEventListener('click', (e) => { // temporarily!!!
	if(gaimly && e.target.classList.contains('move')) {
		if(e.target.classList.contains('Up') && !arrCells[move].top) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Up();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
		else if(e.target.classList.contains('Right') && !arrCells[move].right) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Right();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
		else if(e.target.classList.contains('Down') && !arrCells[move].bottom) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Down();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
		else if(e.target.classList.contains('Left') && !arrCells[move].left) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Left();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
	}
})

document.addEventListener('keypress', (e) => {
	if(gaimly) {
		if(e.key === 'w' && !arrCells[move].top) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Up();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
		else if(e.key === 'd' && !arrCells[move].right) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Right();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
		else if(e.key === 's' && !arrCells[move].bottom) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Down();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
		else if(e.key === 'a' && !arrCells[move].left) {
			if(labMatrix[player.a][player.b] !== 0) {
				clearPlayer(player);
				player.Left();
				drawPlayer(player);
				move++;
				drawCell(arrCells[move], player);
			}
		}
	}
})