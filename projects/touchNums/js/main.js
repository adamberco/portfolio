var gNums = []
var tempNums = []
var gInterval
var mint = 0
var miliseconds = 0
var seconds = 0
var gameStarted = false
var gameCount = 0


function initGame(size = 16) {
    createNums(size)
    createGameBoard(gNums)
}

function easy() {
    clearInterval(gInterval)
    gInterval = null
    gameStarted = false
    restartGame(16)
}
function medium() {
    clearInterval(gInterval)
    gInterval = null
    gameStarted = false
    restartGame(25)
}
function hard() {
    clearInterval(gInterval)
    gInterval = null
    gameStarted = false
    restartGame(36)
}

function createNums(size) {
    for (var i = 1; i <= size; i++) {
        gNums.push(i)
        tempNums.push(i)
    }
}

function createGameBoard(nums) {
    var nums = shuffle(gNums.slice())
    var numsLength = nums.length
    var board = document.querySelector('tbody')
    var strHTML = ''
    for (var i = 0; i < Math.sqrt(numsLength); i++) {
        strHTML += `<tr>`
        for (var j = 0; j < Math.sqrt(numsLength); j++) {
            strHTML += `<td><button class = "unpressed" onclick="cellClicked(this)">${nums.pop()}</button></td>`
        }
        strHTML += `</tr>`
    }
    board.innerHTML += strHTML
}

function cellClicked(clickedNum) {
    var victory = gNums.length
    if (parseInt(clickedNum.innerText) === tempNums[0]) {
        tempNums.shift()
        clickedNum.classList.add('pressed')
        clickedNum.classList.remove('unpressed')
        gameCount++
    }
    if ((parseInt(clickedNum.innerText)) === gNums[0] && gameStarted === false) {
        gInterval = setInterval(Timer, 10)
        gameStarted = true
    }
    if ((parseInt(clickedNum.innerText)) === victory && gameCount === victory) {
        clearInterval(gInterval)
        gInterval = null
        gameStarted = false
        document.querySelector('.restart').style.display = 'initial'
    }
}

function restartGame(size = 16) {
    document.querySelector('.restart').style.display = 'none'
    var board = document.querySelector('tbody')
    board.innerHTML = ''
    gNums = []
    tempNums = []
    gInterval
    mint = 0
    miliseconds = 0
    seconds = 0
    gameCount = 0
    initGame(size)
}

function Timer() {
    var elTimer = document.querySelector('.timer td')
    miliseconds++
    if (miliseconds === 99) {
        miliseconds = 0
        seconds++
    }
    if (seconds === 59) {
        seconds = 0
        mint++
    }
    elTimer.innerText = (seconds < 10) ? `${'0' + mint}:${'0' + seconds}:${miliseconds + '0'}` : `${'0' + mint}:${seconds}:${miliseconds + '0'}`
}