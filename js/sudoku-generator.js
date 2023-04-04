function generateSudoku() {
    const grid = [    [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  
    if (solveSudoku(grid)) {
      const difficulty = document.getElementById('difficulty').value;
      let numToRemove;
  
      switch (difficulty) {
        case 'easy':
          numToRemove = 40;
          break;
        case 'medium':
          numToRemove = 45;
          break;
        case 'hard':
          numToRemove = 50;
          break;
      }
  
      removeCells(grid, numToRemove);
  
      displayGrid(grid);
    } else {
      alert('Impossible de générer un Sudoku valide.');
    }
  }
  
  function solveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);
  
    if (!emptyCell) {
      return true;
    }
  
    const row = emptyCell[0];
    const col = emptyCell[1];
  
    for (let i = 1; i <= 9; i++) {
      if (isValidMove(grid, row, col, i)) {
        grid[row][col] = i;
  
        if (solveSudoku(grid)) {
          return true;
        }
  
        grid[row][col] = 0;
      }
    }
  
    return false;
  }
  
  function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
  
    return null;
  }
  
  function isValidMove(grid, row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === value) {
        return false;
      }
    }
  
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === value) {
        return false;
    }
}

const squareRow = Math.floor(row / 3) * 3;
const squareCol = Math.floor(col / 3) * 3;

for (let i = squareRow; i < squareRow + 3; i++) {
for (let j = squareCol; j < squareCol + 3; j++) {
if (grid[i][j] === value) {
return false;
}
}
}

return true;
}

function removeCells(grid, numToRemove) {
let count = 0;

while (count < numToRemove) {
const row = Math.floor(Math.random() * 9);
const col = Math.floor(Math.random() * 9);

if (grid[row][col] !== 0) {
    const temp = grid[row][col];
    grid[row][col] = 0;
  
    const tempGrid = [];
  
    for (let i = 0; i < 9; i++) {
      tempGrid.push(grid[i].slice());
    }
  
    const solutions = findAllSolutions(tempGrid);
  
    if (solutions.length !== 1) {
      grid[row][col] = temp;
    } else {
      count++;
    }
  }
}
}

function findAllSolutions(grid) {
const solutions = [];

solveSudokuHelper(grid, solutions);

return solutions;
}

function solveSudokuHelper(grid, solutions) {
const emptyCell = findEmptyCell(grid);

if (!emptyCell) {
solutions.push(grid.map(row => row.slice()));
return;
}

const row = emptyCell[0];
const col = emptyCell[1];

for (let i = 1; i <= 9; i++) {
if (isValidMove(grid, row, col, i)) {
grid[row][col] = i;
solveSudokuHelper(grid, solutions);
grid[row][col] = 0;
}
}
}

function displayGrid(grid) {
const table = document.getElementsByClassName('sudoku')[0];

for (let row = 0; row < 9; row++) {
for (let col = 0; col < 9; col++) {
const cell = table.rows[row].cells[col];
const value = grid[row][col];
cell.innerHTML = value !== 0 ? value : '';

if (value !== 0) {
  cell.classList.add('initial');
} else {
  cell.classList.remove('initial');
}

if (!isValidMove(grid, row, col, value)) {
  cell.classList.add('invalid');
} else {
  cell.classList.remove('invalid');
}

if (cell.classList.contains('editable')) {
  cell.removeEventListener('click', startEditing);
}

cell.classList.add('editable');
cell.addEventListener('click', startEditing);
}
}
}

function startEditing() {
const value = this.innerHTML;
this.innerHTML = '';

const input = document.createElement('input');
input.type = 'text';
input.value = value;
input.maxLength = 1;
input.style.width = '100%';
input.style.height = '100%';
input.style.textAlign = 'center';
input.style.fontSize = '24px';
input.style.fontWeight = '700';
input.style.border = 'none';
input.style.borderRadius = '5px';
input.style.backgroundColor = '#f5f5f5';
input.style.color = '#333333';
input.addEventListener('blur', stopEditing.bind(this, input));
this.appendChild(input);
input.focus();
}

function stopEditing(input) {
const value = parseInt(input.value);

if (!isNaN(value) && value >= 1 && value <= 9) {
this.innerHTML = value;
} else {
this.innerHTML = '';
}
}

window.onload = function() {
generateSudoku();

const solveButton = document.getElementById('solve-button');
solveButton.addEventListener('click', () => displayGrid(grid));

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', generateSudoku);
};