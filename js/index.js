const solveButton = document.getElementById('solve-button');

solveButton.addEventListener('click', () => {
  const grid = getGridValues();

  if (isValidGrid(grid)) {
    const solvedGrid = solveGrid(grid);

    if (solvedGrid) {
      setGridValues(solvedGrid);
    } else {
      alert('This sudoku puzzle cannot be solved!');
    }
  } else {
    alert('Please enter a valid sudoku puzzle!');
  }
});

function getGridValues() {
  const gridValues = [];

  for (let i = 0; i < 9; i++) {
    gridValues[i] = [];

    for (let j = 0; j < 9; j++) {
      const cellValue = document.getElementById(`cell-${i}-${j}`).value;
      gridValues[i][j] = cellValue ? parseInt(cellValue) : null;
    }
  }

  return gridValues;
}

function setGridValues(gridValues) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = gridValues[i][j];
    }
  }
}

function isValidGrid(grid) {
    // Check that each row contains only unique numbers 1-9
    for (let i = 0; i < 9; i++) {
      const row = grid[i].filter(val => val !== null);
      if (new Set(row).size !== row.length) {
        return false;
      }
    }
  
    // Check that each column contains only unique numbers 1-9
    for (let j = 0; j < 9; j++) {
      const column = [];
      for (let i = 0; i < 9; i++) {
        const val = grid[i][j];
        if (val !== null) {
          column.push(val);
        }
      }
      if (new Set(column).size !== column.length) {
        return false;
      }
    }
  
    // Check that each 3x3 subgrid contains only unique numbers 1-9
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const subgrid = [];
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            const val = grid[i + k][j + l];
            if (val !== null) {
              subgrid.push(val);
            }
          }
        }
        if (new Set(subgrid).size !== subgrid.length) {
          return false;
        }
      }
    }
  
    // If all checks pass, the grid is valid
    return true;
  }
  

  function solveGrid(grid) {
    // Find the first empty cell in the grid
    const [row, col] = findEmptyCell(grid);
  
    // If there are no empty cells, the grid is solved
    if (row === -1 && col === -1) {
      return grid;
    }
  
    // Try each number from 1 to 9 in the empty cell
    for (let i = 1; i <= 9; i++) {
      // Check if the current number is valid in the current position
      if (isValidMove(grid, row, col, i)) {
        // Set the current number in the grid
        grid[row][col] = i;
  
        // Recursively solve the remaining grid
        const solvedGrid = solveGrid(grid);
  
        // If the remaining grid can be solved, return the solved grid
        if (solvedGrid) {
          return solvedGrid;
        }
  
        // If the remaining grid cannot be solved, backtrack and try the next number
        grid[row][col] = null;
      }
    }
  
    // If no valid number can be found, the puzzle cannot be solved
    return null;
  }
  
  function findEmptyCell(grid) {
    // Find the first empty cell in the grid
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === null) {
          return [i, j];
        }
      }
    }
  
    // If no empty cells are found, return [-1, -1]
    return [-1, -1];
  }
  
  function isValidMove(grid, row, col, val) {
    // Check if the current number is already in the current row
    if (grid[row].includes(val)) {
      return false;
    }
  
    // Check if the current number is already in the current column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === val) {
        return false;
      }
    }
  
    // Check if the current number is already in the current 3x3 subgrid
    const subgridRow = Math.floor(row / 3) * 3;
    const subgridCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[subgridRow + i][subgridCol + j] === val) {
          return false;
        }
      }
    }
  
    // If the current number is not already in the current row, column, or subgrid, it is a valid move
    return true;
  }
  