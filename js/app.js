//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
//5) Define the required constants.
const winningLines = [
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

let turn = "X";
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const sqrEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetButton = document.querySelector("#restart");

/*-------------------------------- Functions --------------------------------*/

function initialize() {
    // console.log("Init.")
    board = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    winner = false;
    tie = false;
    turn = "X";
    
    renderGame();
};

initialize()

function renderGame() {
    updateBoard();
    updateMessage();
};

function updateBoard(index) {
    board[index] = turn
};

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's player ${turn}'s turn`
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `Congrats player ${turn}!`
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
    }
};

// I would like to figure out how to check if there's a winner in a more succinct way than this... I would also like to figure out how to remove the event listener for clicking on squares and add the event listener to reset the game when a winner or a tie is called.

function checkTie() {
    tie = !winner && board.every(cell => cell !== "")
};

function switchPlayer() {
if (winner) {
    return
} else if (!winner && turn === "X") {
        turn = "O"
} else if (!winner && turn === "O") {
        turn = "X"
}};

function handleClick(event) {
    const cell = event.target
    const index = cell.id

    updateBoard(index);

    cell.textContent = turn;

    checkWinner();
    checkTie();
    switchPlayer();
    renderGame();
};

function gameOverClick(event) {
    cell = event.target
    index = cell.id
    cell.textContent = "";
};

// /*----------------------------- Event Listeners -----------------------------*/

sqrEls.forEach(squareEl => {
    squareEl.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", () => {
    initialize();
    sqrEls.forEach(cell => cell.innerText = "");
});