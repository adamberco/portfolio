const WALL = 'WALL';
const FLOOR = 'FLOOR';
const TUNNEL = 'TUNNEL'
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
const BALL_IMG = '<img src="img/ball.png" />';
const GLUE_IMG = '<img src="img/poo.png" />';
const soundCollected = new Audio('../sound/yeah.mp3');
const soundFinish = new Audio('../sound/finish.mp3');
const soundOops = new Audio('../sound/oops.mp3');

var gBoard;
var gGamerPos;
var gInterval;
var gGlueInterval;
var gBallsCollected = 0
var gBallsCreated = 2
var isGlued = false


function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gInterval = setInterval(renderBall, 2000)
	gGlueInterval = setInterval(addGLUE, 2000)
}

function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}
			if (i === 0 && j === 6 || j === 0 && i === 5 || i === board.length - 1 && j === 7 || i === 4 && j === board[0].length - 1) {
				cell.type = TUNNEL;
			}


			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[getRandomInt(1, 8)][getRandomInt(1, 10)].gameElement = BALL;
	board[getRandomInt(1, 8)][getRandomInt(1, 10)].gameElement = BALL;

	return board;
}
// add obstacles - gamer who touches the obstacle freezes
function addGLUE() {
	var rndI = getRandomInt(1, 8)
	var rndJ = getRandomInt(1, 10)
	var rndCell = gBoard[rndI][rndJ]
	var newGluePose = { i: rndI, j: rndJ }

	if (!rndCell.gameElement) {
		rndCell.gameElement = GLUE
		renderCell(newGluePose, GLUE_IMG)
	}
	setTimeout(function () {
		if (rndCell.gameElement === GAMER) return
		renderCell(newGluePose, '')
		rndCell.gameElement = null
	}, 4000)
}


// render the gamer in the other side of the tunnel
function tunnelMove() {
	console.log(gGamerPos)
	switch (gGamerPos.i) {
		case 5:
			var i = 4;
			var j = 11;
			var validKey = (event.key === 'ArrowLeft')
			break
		case 0:
			var i = 9;
			var j = 7;
			var validKey = (event.key === 'ArrowUp')
			break
	}
	switch (gGamerPos.j) {
		case 11:
			var i = 5;
			var j = 0;
			var validKey = (event.key === 'ArrowRight')
			break
		case 7:
			var i = 0;
			var j = 6;
			var validKey = (event.key === 'ArrowDown')
			break
	}
	if (validKey) {
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '')
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
		renderCell(gGamerPos, GAMER_IMG)
	}

}

// Reset the game when clicked on reset
function resetGame() {
	gBallsCollected = 0
	gBallsCreated = 2
	gInterval = 0
	gGlueInterval = 0
	var elCounter = document.querySelector('.counter')
	var elBtn = document.querySelector('button')
	elBtn.style.display = 'none'
	elCounter.innerText = `You Collected ${gBallsCollected} Balls`
	initGame()
	soundFinish.pause()
}

// Check if the balls collected are equal to the balls created and finish the game
function gameOver() {
	if (gBallsCollected !== gBallsCreated) return
	clearInterval(gInterval)
	clearInterval(gGlueInterval)
	var elCounter = document.querySelector('.counter')
	var elBtn = document.querySelector('button')
	elBtn.style.display = 'block'
	elCounter.innerText = `You Collected ${gBallsCollected} Balls And You WON!!!`
	soundFinish.play()
}

// Count and display the balls collected

function ballCollected() {
	gBallsCollected++
	console.log(gBallsCollected)
	var elCounter = document.querySelector('.counter')
	elCounter.innerText = `You Collected ${gBallsCollected} Balls`
	soundCollected.play();
	gameOver()
}

// Render ball in a random cell in the board

function renderBall() {
	var rndI = getRandomInt(1, 8)
	var rndJ = getRandomInt(1, 10)
	var rndCell = gBoard[rndI][rndJ]
	var newBallPose = { i: rndI, j: rndJ }

	if (!rndCell.gameElement) {
		rndCell.gameElement = BALL
		renderCell(newBallPose, BALL_IMG)
		gBallsCreated++
		console.log(gBallsCreated)
	}
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';

	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })
			switch (currCell.type) {
				case FLOOR:
					cellClass += ' floor'
					break
				case WALL:
					cellClass += ' wall'
					break
				case TUNNEL:
					cellClass += ' tunnel'
					break
			}

			strHTML += `\t<td class="cell ${cellClass}
				"  onclick="moveTo(${i},${j})" >\n`;

			switch (currCell.gameElement) {
				case GAMER:
					strHTML += GAMER_IMG
					break
				case BALL:
					strHTML += BALL_IMG
					break
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location

function moveTo(i, j) {
	if (isGlued) return
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			ballCollected()
		}

		if (targetCell.gameElement === GLUE) {
			console.log('Glued!');
			isGlued = true
			GAMER_IMG = '<img src="img/gamer-purple.png" />'
			soundOops.play()
			setTimeout(function () {
				isGlued = false
				GAMER_IMG = '<img src="img/gamer.png" />';
			}, 3000)

		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);
		if (targetCell.type === TUNNEL) {
			tunnelMove()
		}

	}// else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

