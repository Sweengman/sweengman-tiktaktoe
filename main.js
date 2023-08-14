//<!-- Constants -->

//true = player 1 && false == player 2
const playerToken = {
    1: 'X',
    2: 'O'
}

//<!-- State Variables -->
let board  //3x3g grid
let turn   // 1 || 0
let winner // null || 1 || -1 || 'T'

//<!-- Cached Elements -->
const boardEls = [...document.querySelectorAll('#board > div')]
const buttonEl = document.querySelector('button')

//<!-- Event Listeners -->
for (el of boardEls){
    el.addEventListener('click', renderMove)
}


//<!-- Functions -->
init()

function init() {
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    turn = 1 
    winner = false
    render()
}

function render(){
    renderMessage()
    renderControls() 
}


function renderMessage() {
document.querySelector('h3').innerHTML =  
winner ? `Player ${turn} wins!` : `${playerToken[turn]}, your turn!`
}

function renderControls() {
buttonEl.style.visibility = winner ? 'visible' : 'hidden'
}

function renderMove(event) {
    renderToken(event)
    winner = checkWinner()
    if (winner === false) {
        turnSwap()
        render()
    } else {
    render()
    }
}
function renderToken(event) {
slot = event.target

if (slot.innerText === '') {
slot.innerText = playerToken[turn]

} else {return console.log('error')}
}

function checkWinner() {
    let coordinates = getCoordinates(slot.id)
    updateArrLocation(coordinates)
    if(checkWinVert(coordinates) ||
    checkWinHor(coordinates) ||
    checkWinDiaNESW(coordinates) ||
    checkWinDiaNWSE(coordinates)){
        return true
    } else {return false}
}

function turnSwap() {
    if (turn === 1) {
        turn ++
    } else {
        turn --
    }
}

//Check Win Directionals
function checkWinVert(coordinates) {
    let tally = 0
    tally += countAdjacent(coordinates[0], coordinates[1], 0, 1)
    tally += countAdjacent(coordinates[0], coordinates[1], 0, -1)
    if(tally === 2) {
        console.log('success')

        return true
    } else {return false}
}

function checkWinHor(coordinates) {
    let tally = 0
    tally += countAdjacent(coordinates[0], coordinates[1], 1, 0)
    tally += countAdjacent(coordinates[0], coordinates[1], -1, 0)
    if(tally === 2) {
        console.log('success')

        return true
    } else {return false}}

function checkWinDiaNESW(coordinates) {
    let tally = 0
    tally += countAdjacent(coordinates[0], coordinates[1], 1, 1)
    tally += countAdjacent(coordinates[0], coordinates[1], -1, -1)
    if(tally === 2) {
        console.log('success')

        return true
    } else {return false}}

function checkWinDiaNWSE(coordinates) {
    let tally = 0
    tally += countAdjacent(coordinates[0], coordinates[1], -1, 1)
    tally += countAdjacent(coordinates[0], coordinates[1], 1, -1)
    if(tally === 2) {
        console.log('success')
        return true
    } else {return false}}

//helper functions
function getCoordinates(id) {
    return id.split('')
}

function updateArrLocation(coordinates) {
    if (board[coordinates[0]][coordinates[1]] === 0) {
    board[coordinates[0]][coordinates[1]] = turn
    } else {console.log('invalid move')}
}


function countAdjacent(rowIdx, colIdx, rowOffset, colOffset) {
    //switched string to variable
    colIdx = Number(colIdx)
    rowIdx = Number(rowIdx)
    // grab player who just made a move
    const player = board[rowIdx][colIdx]
    //start count
    let count = 0
    colIdx += colOffset
    rowIdx += rowOffset
    // console.log(board[colIdx])
    // console.log(board[rowIdx])
    //loop until a condition is met
    while (
        board[rowIdx] !== undefined &&
        board[rowIdx][colIdx] !== undefined &&
        board[rowIdx][colIdx] === player
    ) {
        console.log('test')
        count++
        colIdx += colOffset
        rowIdx += rowOffset
        console.log(count)
    }
    return count

}


