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
  displayValue = `<img src="https://media1.tenor.com/m/IAyUQchUicIAAAAd/eliezer-yudkowsky-george-hotz.gif" alt="Result GIF" width="256"><br>`;
  updateDisplay();

  setTimeout(() => {
    displayValue += result;
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
  displayValue = `<img src="https://cdn.discordapp.com/attachments/1243466418901614693/1246635748309078246/image0-4.gif?ex=665d1b83&is=665bca03&hm=f6c176d76c45e732f1aba7194365c430f773cadaeda894b4131c13a3398bd503&" alt="Thinking GIF"><br>Using composio-julep pipeline`;
  updateDisplay();

  const intervalId = setInterval(() => {
    dots = dots.length < 3 ? dots + "." : "";
    displayElement.innerHTML = displayValue + dots;
  }, 500);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 2000);
}
