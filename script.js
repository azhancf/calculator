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
            return (add(a, b).countDecimals() > 6 ? add(a, b).toFixed(6) : add(a, b));;
        case "-":
            return (subtract(a, b).countDecimals() > 6 ? subtract(a, b).toFixed(6) : subtract(a, b));;
        case "×":
            return (multiply(a, b).countDecimals() > 6 ? multiply(a, b).toFixed(6) : multiply(a, b));
        case "÷":
            if (b != 0) {
                return (divide(a, b).countDecimals() > 6 ? divide(a, b).toFixed(6) : divide(a, b));
            }
            return "lmao";
    }
}

Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
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

function AC() {
    resetValues();
    clearDisplay();
}

function equals() {
    if (currentNumber != "" && operator != null) {
        num2 = currentNumber;
        clearDisplay();
        addToDisplay(operate(operator, num1, num2));
        newCalculation = true;
        clearDisplayNext = true;
    }
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

// todo make decimal points/expression smaller or remove digits to fit on display
// todo numbers get cleared on second expression after operator
// todo text is kind of large such as when dividing by 0 or working with large numbers
// todo disable having two operators in a row
// todo when rounding, the subtracting doesn't really round correctly
// todo if there are extra zeroes, get rid of them



function clickInput(e) {
    const selectedButtonText = e.target.textContent;
    recordNumbers(selectedButtonText);
}

function recordNumbers(text) {
    const selectedButtonText = text;
    if (selectedButtonText == "AC") {
        AC();
    }
    else {
        if (newCalculation) {
            if (!isOperator(selectedButtonText)) resetValues();
            newCalculation = false;
        }
        if (selectedButtonText == "=") {
            equals();
        }
        else if (selectedButtonText == "⌫") {
            backspace();
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

function keyboardInput(e) {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    if (e.key == "Enter") {
        equals();
    }
    else if (e.key == "Tab") {
        doAC();
    }
    else if (e.key == "Backspace") {
        backspace();
    }
    else {
        recordNumbers(key.textContent);
    }
}

function removeTransition() {
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
buttons.forEach(button => button.addEventListener('click', clickInput));
window.addEventListener('keydown', keyboardInput);

// when hovered over, key becomes emphasized
buttons.forEach(button => button.addEventListener('mouseleave', removeTransition));
buttons.forEach(button => button.addEventListener('mouseenter', () => button.classList.add('hovered')));