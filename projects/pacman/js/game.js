'use strict'
const WALL = '%'
const FOOD = '<img class="ball" src="img/ball.JPG"/>'
const EMPTY = ''
const POWER_FOOD = '💪'
const CHERRY = '🍒'

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

var gModal = document.querySelector('.modal')
var gMsg = document.querySelector('.msg')
var gIntervalCherry

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    gIntervalCherry = setInterval(addCherry, 15000)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gModal.style.display = 'none'
    gGame.score = 0
    document.querySelector('.restart-btn').innerText = 'Reset Game'
    document.querySelector('h2 span').innerText = gGame.score
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } // adding power food
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                (i === 8 && j === 1 ||
                    i === 8 && j === 8)) {
                board[i][j] = POWER_FOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(isEaten) {
    console.log('BLABLAGAMEOVER')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    clearInterval(gIntervalCherry)
    gIntervalCherry = null
    clearInterval(gIntervalGhostsColor)
    gIntervalGhostsColor = null
    gMsg.innerText = (isEaten) ? `TOO BAD! You've been eaten!` : `You ate Them ALL! You are the WINNER!`
    gModal.style.display = 'block'
}

function isFinish() {
    for (var i = 1; i < gBoard.length; i++) {
        for (var j = 1; j < gBoard.length; j++) {
            if (gBoard[i][j] === FOOD) return false
        }
    }
    return true
}

function addCherry() {
    var emptyCells = getEmptyCells(gBoard)
    var rndIdx = getRandomInt(1, emptyCells.length - 1)
    var rndCell = emptyCells[rndIdx]

    gBoard[rndCell.i][rndCell.j] = CHERRY
    renderCell(rndCell, CHERRY)
}

function chasingPacman() {
    gPacman.isSuper = true
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        var elGhost = document.querySelector(`.cell${currGhost.location.i}-${currGhost.location.j}`);
        elGhost.innerHTML = '<img src="img/5.JPG"/>';
    }
    setTimeout(function () {
        gPacman.isSuper = false

        gGhosts.push(...gKilledGhosts)
        gKilledGhosts = []

    }, 5000)
}
