let matrixSize = 2;

function generateMatrices() {
  const size = parseInt(document.getElementById('matrixSize').value);
  if (size < 2 || size > 5) {
    showError('Matrix size must be between 2 and 5');
    return;
  }
  matrixSize = size;
  generateMatrix('A');
  generateMatrix('B');
  clearResult();
}

function generateMatrix(matrixName) {
  const matrix = document.getElementById(`matrix${matrixName}`);
  matrix.innerHTML = `<h2>Matrix ${matrixName}</h2>`;
  for (let i = 0; i < matrixSize; i++) {
    const row = document.createElement('div');
    row.className = 'matrix-row';
    for (let j = 0; j < matrixSize; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `${matrixName}${i}${j}`;
      input.value = '0';
      row.appendChild(input);
    }
    matrix.appendChild(row);
  }
}

function getMatrixValues(matrixName) {
  const matrix = [];
  for (let i = 0; i < matrixSize; i++) {
    const row = [];
    for (let j = 0; j < matrixSize; j++) {
      const value = parseFloat(document.getElementById(`${matrixName}${i}${j}`).value) || 0;
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}

function performOperation(operation) {
  const matrixA = getMatrixValues('A');
  const matrixB = getMatrixValues('B');
  let result;

  switch (operation) {
    case 'add':
      result = addMatrices(matrixA, matrixB);
      break;
    case 'subtract':
      result = subtractMatrices(matrixA, matrixB);
      break;
    case 'multiply':
      result = multiplyMatrices(matrixA, matrixB);
      break;
    default:
      showError('Invalid operation');
      return;
  }

  displayResult(result);
}

function addMatrices(matrixA, matrixB) {
  return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
}

function subtractMatrices(matrixA, matrixB) {
  return matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
}

function multiplyMatrices(matrixA, matrixB) {
  return matrixA.map((row, i) =>
    Array(matrixSize).fill().map((_, j) =>
      row.reduce((sum, val, k) => sum + val * matrixB[k][j], 0)
    )
  );
}

function calculateDeterminant(matrixName) {
  const matrix = getMatrixValues(matrixName);
  const det = determinant(matrix);
  displayResult([[det]]);
}

function determinant(matrix) {
  if (matrix.length === 1) return matrix[0][0];
  if (matrix.length === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    const subMatrix = matrix.slice(1).map(row => [...row.slice(0, i), ...row.slice(i + 1)]);
    det += Math.pow(-1, i) * matrix[0][i] * determinant(subMatrix);
  }
  return det;
}

function displayResult(matrix) {
  const resultMatrix = document.getElementById('resultMatrix');
  resultMatrix.innerHTML = '';
  matrix.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.className = 'result-row';
    row.forEach(cell => {
      const cellElement = document.createElement('div');
      cellElement.className = 'result-cell';
      cellElement.textContent = cell.toFixed(2);
      rowElement.appendChild(cellElement);
    });
    resultMatrix.appendChild(rowElement);
  });
}

function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 3000);
}

function clearResult() {
  document.getElementById('resultMatrix').innerHTML = '';
}

// Initialize the calculator
generateMatrices();