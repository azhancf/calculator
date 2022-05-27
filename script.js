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
}

function isOperator(char) {
    return char == "+" || char == "-" || char == "×" || char == "÷";
}

// todo make decimal points/expression smaller or remove digits to fit on display
// todo numbers get cleared on second expression after operator
// todo text is kind of large such as when dividing by 0
// todo disable having two operators in a row

// todo EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. 
    // todo Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. 
    // todo (disable the decimal button if there’s already one in the display)
// todo EXTRA CREDIT: Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
// todo EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.
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
        else {
            if (clearDisplayNext) {
                clearDisplay();
                clearDisplayNext = false;
            }
            if (isOperator(selectedButtonText)) {
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
                currentNumber += selectedButtonText;
                addToDisplay(selectedButtonText);
            }
        }
    }
}

function removeTransition(e) {
    this.classList.remove('hovered');
    console.log("mouse just left");
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

// when hovered over, key becomes emphasized
buttons.forEach(button => button.addEventListener('mouseleave', removeTransition));
buttons.forEach(button => button.addEventListener('mouseenter', () => button.classList.add('hovered')));