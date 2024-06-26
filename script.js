let displayValue = "";
let currentOperation = null;
let firstOperand = null;

function appendNumber(number) {
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").innerHTML = displayValue;
}

function clearDisplay() {
  displayValue = "";
  currentOperation = null;
  firstOperand = null;
  updateDisplay();
}

function chooseOperation(operation) {
  if (displayValue === "") return;
  if (firstOperand !== null) {
    calculate();
  }
  currentOperation = operation;
  firstOperand = displayValue;
  displayValue = "";
}

function displayResultAnimation(result) {
  const displayElement = document.getElementById("display");
  let dots = "";
  const eliezerGif = `<img src="/media/eliezer.gif" alt="Result GIF" width="256"><br>`;
  displayValue = eliezerGif; // Eliezer GIF
  updateDisplay();

  setTimeout(() => {
    displayValue = "";
    displayValue += result; // Concatenate result after the Eliezer GIF
    updateDisplay();

    // Show left and right GIF containers
    document.getElementById("left-gif-container").style.display = "flex";
    document.getElementById("right-gif-container").style.display = "flex";
  }, 2000);
}

function calculate() {
  const secondOperand = displayValue;
  if (!currentOperation || firstOperand === null || secondOperand === "")
    return;

  const data = {
    firstOperand: parseFloat(firstOperand),
    secondOperand: parseFloat(secondOperand),
    operation: currentOperation,
  };

  displayThinkingAnimation();

  setTimeout(() => {
    fetch("http://localhost:3000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        displayResultAnimation(result.result.toString());
        currentOperation = null;
        firstOperand = null;
      })
      .catch((error) => {
        console.error("Error:", error);
        displayValue = "Error";
        updateDisplay();
      });
  }, 2000);
}

function displayThinkingAnimation() {
  const displayElement = document.getElementById("display");
  let dots = "";
  displayValue = `<img src="/media/thinking.gif" width="200px" alt="Thinking GIF"><br>Using composio-julep pipeline`; // composio-julep gif
  updateDisplay();

  const intervalId = setInterval(() => {
    dots = dots.length < 3 ? dots + "." : "";
    displayElement.innerHTML = displayValue + dots;
  }, 500);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 2000);
}
