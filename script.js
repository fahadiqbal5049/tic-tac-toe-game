document.addEventListener("DOMContentLoaded", () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const resetBtn = document.getElementById('reset-button');
    const mode1Btn = document.querySelector('.mode-1');
    const mode2Btn = document.querySelector('.mode-2');
    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;
    let vsComputer = false;

    function checkWinner() {
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8], 
            [0,3,6],[1,4,7],[2,5,8], 
            [0,4,8],[2,4,6]          
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (board.every(cell => cell)) return 'draw';
        return;
    }

    function showResult(result) {
        setTimeout(() => {
            if (result === 'draw') {
                alert("It's a draw!");
                resetGame();
            } else {
                alert(`Player ${result} wins!`);
                resetGame();
            }
        }, 1000);
        
    }

    function handleCellClick(e) {
        const index = cells.indexOf(e.target);
        if (!gameActive || board[index]) return;
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        const result = checkWinner();
        if (result) {
            gameActive = false;
            showResult(result);
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (vsComputer && currentPlayer === 'O' && gameActive) {
            setTimeout(computerMove, 2000);
        }
    }

    function computerMove() {
        const emptyCells = board.map((val, i) => val === '' ? i : null).filter(i => i !== null);
        if (emptyCells.length === 0) return;
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[move] = 'O';
        cells[move].textContent = 'O'; 
        const result = checkWinner();
        if (result) {
            gameActive = false;
            showResult(result);
            return;
        }
        currentPlayer = 'X';
    }

    function resetGame() {
        board = Array(9).fill('');
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
    }

    function setMode(humanVsComputer) {
        vsComputer = humanVsComputer;
        resetGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
    mode1Btn.addEventListener('click', () => setMode(false));
    mode2Btn.addEventListener('click', () => setMode(true));
});

