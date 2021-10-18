'use strict'
var GHOST = '<img src="img/1.JPG" />';
// var GHOST = ' '

var gGhosts = []
var gIntervalGhosts;
var gIntervalGhostsColor
var gKilledGhosts = []

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3,
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    clearInterval(gIntervalGhostsColor)
    gIntervalGhostsColor = null
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    GHOST = (gPacman.isSuper) ? '<img src="img/5.JPG"/>' : rndGhostColor()
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (isGhost(nextLocation)) return
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            killGhost(ghost.location)
            return
        } else {
            gameOver(true);
            return;
        }
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent     // model
    renderCell(ghost.location, ghost.currCellContent)    // dom

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, GHOST)
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function rndGhostColor() {
    var num = getRandomInt(1, 5)
    return `<img src="img/${num}.JPG" />`
}

function killGhost(ghostLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostLocation = gGhosts[i].location
        if (ghostLocation.i === currGhostLocation.i && ghostLocation.j === currGhostLocation.j) {
            gKilledGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
            gBoard[currGhostLocation.i][currGhostLocation.j] = EMPTY
        }
    }
}

function isGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (location.i === currGhost.location.i && location.j === currGhost.location.j) {
            return true
        }
    }
    return false
}

// function getGhostHTML(ghost) {

//     // return `<span>${GHOST}</span>`
//     return GHOST
// }