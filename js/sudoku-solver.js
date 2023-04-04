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
    for (let i = 0; i < 9; i++) {
      const row = grid[i].filter(val => val !== null);
      if (new Set(row).size !== row.length) {
        return false;
      }
    }
  
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
  
    return true;
  }
  

  function solveGrid(grid) {
    const [row, col] = findEmptyCell(grid);
  
    if (row === -1 && col === -1) {
      return grid;
    }
  
    for (let i = 1; i <= 9; i++) {
      if (isValidMove(grid, row, col, i)) {
        grid[row][col] = i;
  
        const solvedGrid = solveGrid(grid);
  
        if (solvedGrid) {
          return solvedGrid;
        }
  
        grid[row][col] = null;
      }
    }
  
    return null;
  }
  
  function findEmptyCell(grid) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === null) {
          return [i, j];
        }
      }
    }
  
    return [-1, -1];
  }
  
  function isValidMove(grid, row, col, val) {
    if (grid[row].includes(val)) {
      return false;
    }
  
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === val) {
        return false;
      }
    }
  
    const subgridRow = Math.floor(row / 3) * 3;
    const subgridCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[subgridRow + i][subgridCol + j] === val) {
          return false;
        }
      }
    }
  
    return true;
  }
  
const resetButton = document.querySelector('#reset-button');

const formFields = document.querySelectorAll('input, textarea');

function resetFormFields() {
  formFields.forEach((field) => {
    field.value = '';
  });
}

resetButton.addEventListener('click', resetFormFields);