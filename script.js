document.addEventListener('DOMContentLoaded', () => {
    const playerXNameInput = document.getElementById('player-x-name');
    const playerONameInput = document.getElementById('player-o-name');
    const startButton = document.getElementById('start-btn');
    const board = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-btn');
    const statusMessage = document.getElementById('status-message');
    const playerXScore = document.getElementById('player-x-score');
    const playerOScore = document.getElementById('player-o-score');
    const cells = [];
  
    let playerX = '';
    let playerO = '';
    let currentPlayer = 'X';
    let winner = null;
    let moves = 0;
    let score = { 'X': 0, 'O': 0 };
  
    // Start game when the start button is clicked
    startButton.addEventListener('click', startGame);
  
    function startGame() {
      playerX = playerXNameInput.value || 'Player 1';
      playerO = playerONameInput.value || 'Player 2';
      playerXNameInput.disabled = true;
      playerONameInput.disabled = true;
      startButton.disabled = true;
      createGameBoard();
    }
  
    function createGameBoard() {
      // Clear existing game board
      board.innerHTML = '';
  
      // Create game board
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.addEventListener('click', handleCellClick);
          board.appendChild(cell);
          cells.push(cell);
        }
      }
      statusMessage.textContent = `${playerX}'s turn`;
      updateScore();
    }
  
    function handleCellClick(event) {
      const cell = event.target;
  
      // Check if the cell is already filled or game is won
      if (!cell.textContent && !winner) {
        cell.textContent = currentPlayer;
        moves++;
        if (checkWin()) {
          winner = currentPlayer;
          statusMessage.textContent = `${winner === 'X' ? playerX : playerO} wins!`;
          score[winner]++;
          if (score[winner] === 5) {
            statusMessage.textContent = `${winner === 'X' ? playerX : playerO} is the winner!`;
            disableAllCells();
          }
          highlightWinningCells();
        } else if (moves === 9) {
          statusMessage.textContent = "It's a draw!";
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          statusMessage.textContent = `${currentPlayer === 'X' ? playerX : playerO}'s turn`;
        }
        updateScore();
      }
    }
  
    function checkWin() {
      const lines = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const line of lines) {
        const [a, b, c] = line;
        if (cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
          return true;
        }
      }
      return false;
    }
  
    function highlightWinningCells() {
      const lines = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const line of lines) {
        const [a, b, c] = line;
        if (cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
          cells[a].classList.add('win');
          cells[b].classList.add('win');
          cells[c].classList.add('win');
          break;
        }
      }
    }
  
    function disableAllCells() {
      cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
      });
    }
  
    function updateScore() {
      playerXScore.textContent = `${playerX}: ${score['X']}`;
      playerOScore.textContent = `${playerO}: ${score['O']}`;
    }
  
    // Reset game
    resetButton.addEventListener('click', resetGame);
  
    function resetGame() {
      playerXNameInput.value = '';
      playerONameInput.value = '';
      playerXNameInput.disabled = false;
      playerONameInput.disabled = false;
      startButton.disabled = false;
      statusMessage.textContent = '';
      currentPlayer = 'X';
      winner = null;
      moves = 0;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
        cell.addEventListener('click', handleCellClick);
      });
      score = { 'X': 0, 'O': 0 };
      updateScore();
    }
  });
  