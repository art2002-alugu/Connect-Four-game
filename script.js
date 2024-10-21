const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'red';
let gameBoard = Array(6).fill().map(() => Array(7).fill(null));

const createBoard = () => {
    board.innerHTML = '';
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropDisc(col));
            board.appendChild(cell);
        }
    }
};

const dropDisc = (col) => {
    for (let row = 5; row >= 0; row--) {
        if (!gameBoard[row][col]) {
            gameBoard[row][col] = currentPlayer;
            renderBoard();
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
};

const renderBoard = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const col = index % 7;
        const row = Math.floor(index / 7);
        if (gameBoard[row][col]) {
            cell.classList.add(gameBoard[row][col]);
        } else {
            cell.classList.remove('red', 'yellow');
        }
    });
};

const checkWin = (player) => {
    // Check horizontal, vertical, and diagonal win conditions
    const directions = [
        { x: 1, y: 0 },   // Horizontal
        { x: 0, y: 1 },   // Vertical
        { x: 1, y: 1 },   // Diagonal /
        { x: 1, y: -1 }   // Diagonal \
    ];

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (gameBoard[row][col] === player) {
                for (const { x, y } of directions) {
                    if (checkDirection(row, col, x, y, player) >= 4) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

const checkDirection = (row, col, x, y, player) => {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        const r = row + i * y;
        const c = col + i * x;
        if (r < 0 || r >= 6 || c < 0 || c >= 7 || gameBoard[r][c] !== player) {
            break;
        }
        count++;
    }
    return count;
};

const resetGame = () => {
    gameBoard = Array(6).fill().map(() => Array(7).fill(null));
    currentPlayer = 'red';
    renderBoard();
};

resetButton.addEventListener('click', resetGame);

createBoard();
