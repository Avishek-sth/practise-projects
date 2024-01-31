let currentPlayer = 'X'; // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 board
let gameActive = true;

const playerTurn = (clickedCellIndex) => {
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    checkForWinOrDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const cellClicked = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    playerTurn(clickedCellIndex);
    updateUI();
}

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
});

const updateUI = () => {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
}

const announceWinner = (player) => {
    const msg = document.getElementById('gameMsg');
    msg.innerText = `Player ${player} Wins!`;
}

const announceDraw = () => {
    const msg = document.getElementById('gameMsg');
    msg = 'Game Draw!';
}

const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
];

const checkForWinOrDraw = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
}

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMsg').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);