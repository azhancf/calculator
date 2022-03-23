// Basic Functions:
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;   
}

// Operate:
function operate(operator, a, b) {
    // convert a and b to numbers
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

// Display and Value Functions:
function addToDisplay(value) {
    display.textContent += value;
}
function clearDisplay() {
    display.textContent = "";
}
function resetValues() {
    num1 = null;
    num2 = null;
    operator = null;
    currentNumber = "";
}

function isOperator(char) {
    return char == "+" || char == "-" || char == "×" || char == "÷";
}

// TODO: chain last result with new calculation (look at student example)
function recordNumbers(e) {
    const selectedButtonText = e.target.textContent;

    if (selectedButtonText == "AC") {
        resetValues();
        clearDisplay();
    }
    else {
        if (newCalculation) {
            if (isOperator(selectedButtonText)) {
                num1 = operate(operator, num1, currentNumber);
                console.log(num1);
            }
            else {
                resetValues();
            }
            newCalculation = false;
        }
        if (selectedButtonText == "=") {
            num2 = currentNumber;
            clearDisplay();
            addToDisplay(operate(operator, num1, num2));
            newCalculation = true;
            clearDisplayNext = true;
        }
        else {
            if (clearDisplayNext) {
                clearDisplay();
                clearDisplayNext = false;
            }
            if (isOperator(selectedButtonText)) {
                //console.log("~~~!!!!THIS IS AN OPERATOR!!!!");
                if (num1 != null && currentNumber != "") {
                    num1 = operate(operator, num1, currentNumber); 
                }
                else {
                    num1 = currentNumber;
                }
                currentNumber = "";
                operator = selectedButtonText;
                clearDisplayNext = true;
            }
            else {
                currentNumber += selectedButtonText;
                addToDisplay(selectedButtonText);
            }
        }
    
    }
    
    
    // console.log(num1);
    // console.log(num2);
    // console.log(operator);
    // console.log(currentNumber);
}


let num1 = null;
let num2 = null;
let operator = null;
let clearDisplayNext = false;
let newCalculation = false; // because doesn't start with result
let currentNumber = "";

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', recordNumbers));