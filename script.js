let displayValue = '';
let currentOperation = null;
let firstOperand = null;

function appendNumber(number) {
  if (displayValue === '0') {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
  displayValue = '';
  currentOperation = null;
  firstOperand = null;
  updateDisplay();
}

function chooseOperation(operation) {
  if (displayValue === '') return;
  if (firstOperand !== null) {
    calculate();
  }
  currentOperation = operation;
  firstOperand = displayValue;
  displayValue = '';
}

function calculate() {
  const secondOperand = displayValue;
  if (!currentOperation || firstOperand === null || secondOperand === '') return;

  const data = {
    firstOperand: parseFloat(firstOperand),
    secondOperand: parseFloat(secondOperand),
    operation: currentOperation
  };

  console.log(data);

  fetch('/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    displayValue = result.result.toString();
    currentOperation = null;
    firstOperand = null;
    updateDisplay();
  })
  .catch(error => {
    console.error('Error:', error);
    displayValue = 'Error';
    updateDisplay();
  });
}
