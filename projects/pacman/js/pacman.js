'use strict'
var PACMAN = '<img class="pacman" src="img/pacmanRight.JPG"/>'
var doubleSuper = false
var gStrHtmlPacman = ''

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL || nextCell === POWER_FOOD && gPacman.isSuper) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        else chasingPacman()
    }
    if (isGhost(nextLocation)) {
        if (gPacman.isSuper) killGhost(nextLocation)
        else gameOver(true)
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY; // update the model
    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);

    if (isFinish()) {
        gameOver(false)
    }
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            PACMAN = '<img class="pacman" src="img/pacmanUp.JPG"/>'
            nextLocation.i--;
            break;
        case 'ArrowDown':
            PACMAN = '<img class="pacman" src="img/pacmanDown.JPG"/>'
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            PACMAN = '<img class="pacman" src="img/pacmanLeft.JPG"/>'
            nextLocation.j--;
            break;
        case 'ArrowRight':
            PACMAN = '<img class="pacman" src="img/pacmanRight.JPG"/>'
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}
