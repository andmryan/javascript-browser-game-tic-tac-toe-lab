//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board = [
    "", "", "",
    "", "", "",
    "", "", "",
];

let player = 'x';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".square");
const messageEl = document.querySelector("#message");
const resetButton = document.querySelector("#restart");

/*-------------------------------- Functions --------------------------------*/

function updateBoard(index) {
    board[index] = player
}

function renderGame() {
    updateBoard();
    updateMessage();
};

function start() {
    board = [
        "","","",
        "","","",
        "","","",
    ]
    winner = false
    tie = false
    player = 'x'
    renderGame();
};

start();

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${player}'s turn!`
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `Congrats ${player}!`
    }
};

function checkWinner() {
    if (board[0] !== "" && board[0] === board[1] && board[0] === board[2]) {
        winner = true
    } else if (board[3] !== "" && board[3] === board[4] && board[3] === board[5]) {
        winner = true
    } else if (board[6] !== "" && board[6] === board[7] && board[6] === board[8]) {
    winner = true
    }else if (board[0] !== "" && board[0] === board[3] && board[0] === board[6]) {
    winner = true
    }else if (board[1] !== "" && board[1] === board[4] && board[1] === board[7]) {
    winner = true
    }else if (board[2] !== "" && board[2] === board[5] && board[2] === board[8]) {
    winner = true
    }else if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
    winner = true
    }else if (board[6] !== "" && board[6] === board[4] && board[6] === board[2]) {
    winner = true
}};

// I would like to figure out how to make the game check if there's something from winLines rather than writing out all the combos, but my brain is fried atm.

function checkTie() {
    tie = !winner && board.every(cell => cell !== "")
};

function playerChange() {
if (winner) {
    return
} else if (!winner && player === "x") {
        player = "o"
} else if (!winner && player === "o") {
        player = "x"
}};

function handleClick(event) {
    const cell = event.target
    const index = cell.id
    updateBoard();
    cell.textContent = player
    checkWinner();
    checkTie();
    playerChange();
    renderGame();
};

// I can't tell why my game can't decide who the winner is? Everything else seems to work. I left it as is for now, since turning in something is better than turning in nothing. :(

// /*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(squareEl => {
    squareEl.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', () => {
    start();
    squareEls.forEach(cell => cell.innerText = "")
});