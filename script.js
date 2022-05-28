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
    return (b != 0 ? (a / b).toFixed(4) : "lmao");   
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
    usingDecimal = false;
}

function isOperator(char) {
    return char == "+" || char == "-" || char == "×" || char == "÷";
}

// todo make decimal points/expression smaller or remove digits to fit on display
// todo numbers get cleared on second expression after operator
// todo text is kind of large such as when dividing by 0 or working with large numbers
// todo disable having two operators in a row
// todo round even when adding/subtracting


// todo EXTRA CREDIT: Add keyboard support!

function recordNumbers(e) {
    const selectedButtonText = e.target.textContent;

    if (selectedButtonText == "AC") {
        resetValues();
        clearDisplay();
    }
    else {
        if (newCalculation) {
            if (!isOperator(selectedButtonText)) resetValues();
            newCalculation = false;
        }
        if (selectedButtonText == "=") {
            if (currentNumber != "" && operator != null) {
                num2 = currentNumber;
                clearDisplay();
                addToDisplay(operate(operator, num1, num2));
                newCalculation = true;
                clearDisplayNext = true;
            }
        }
        else if (selectedButtonText == "⌫") {
            display.textContent = display.textContent.slice(0, -1);
        }
        else {
            if (clearDisplayNext) {
                clearDisplay();
                clearDisplayNext = false;
            }
            if (isOperator(selectedButtonText)) {
                usingDecimal = false;
                if (num1 && currentNumber != "") {
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
                if (selectedButtonText == "." && !usingDecimal) {
                    usingDecimal = true;
                    currentNumber += selectedButtonText;
                    addToDisplay(selectedButtonText);
                }
                else {
                    if (selectedButtonText != ".") {
                        currentNumber += selectedButtonText;
                        addToDisplay(selectedButtonText);
                    }
                }
            }
        }
    }
}

function removeTransition(e) {
    this.classList.remove('hovered');
}


let num1 = null;
let num2 = null;
let operator = null;
let clearDisplayNext = false;
let newCalculation = false; // because doesn't start with result
let currentNumber = "";
let usingDecimal = false;

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', recordNumbers));

// when hovered over, key becomes emphasized
buttons.forEach(button => button.addEventListener('mouseleave', removeTransition));
buttons.forEach(button => button.addEventListener('mouseenter', () => button.classList.add('hovered')));