// basic functions
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

function operate(operator, a, b) {
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

// display and value functions
function displayContent(value) {
    display.textContent += value;
}

function resetValues() {
    num1 = null;
    operator = null;
    num2 = null;
    currentNumber = "";
}

function clearDisplay() {
    display.textContent = "";
}


// TODO: make font of numbers smaller if too big to fit on the display
// TODO: use result of = in next calculation
// TODO: errors if two operators in a row, at the beginning, etc.


function findEntireNumber(expression, index, direction) {
    let currentIndex = index;
    let currentChar = expression[currentIndex];
    while (currentChar != "+" && currentChar != "+" && currentChar != "+" && currentChar != "+" && currentIndex != 0 && currentIndex != expression.length - 1) { // or beginning/end of expression
        direction == "left" ? currentIndex-- : currentIndex++; // index up if right and down if left
        currentChar = expression[currentIndex];
    } 
    // also starts from the operator (doesn't entirely work when past the operator)
    return expression.substring(currentIndex, index);
}

function calculate(expression) {
    for (let i = 0; i < expression.length; i++) {
        let entireLeft = findEntireNumber(expression, i, "left");
        console.log(i + ": " + entireLeft);
        let entireRight = findEntireNumber(expression, i, "right");
        // switch (expression[i]) {
        //     case "+":
        //         console.log(operate("+", entireLeft, entireRight));
        //         break;
        //     case "-":
        //         console.log(operate("-", entireLeft, entireRight));
        //         break;
        //     case "×":
        //         console.log(operate("×", entireLeft, entireRight));
        //         break;
        //     case "÷":
        //         console.log(operate("÷", entireLeft, entireRight));
        //         break;
        // }
    }
}


function recordNumbers(e) {
    const selectedButton = e.target.textContent;
    if (selectedButton == "=") {
        calculate(display.textContent);
    }
    else if (selectedButton == "AC") {
        clearDisplay();
    }
    else {
        displayContent(selectedButton);
    }
    // redo RESETVALUES function

    // if (selectedButton == "=") {
    //     num2 = currentNumber;
    //     clearDisplay();
    //     displayContent(operate(operator, num1, num2));
    //     resetValues();
    //     newCalculation = true;
    // }
    // else if (selectedButton == "AC") {
    //     resetValues();
    //     clearDisplay();
    // }
    // else {
    //     if (newCalculation) {
    //         clearDisplay();
    //         newCalculation = false;
    //     }
    //     if ((selectedButton == "+" || selectedButton == "-" || selectedButton == "×" || selectedButton == "÷") && operator == null) {
    //         num1 = currentNumber;
    //         currentNumber = "";
    //         operator = selectedButton;
    //     }
    //     else {
    //         currentNumber += selectedButton;
    //     }
    //     displayContent(selectedButton);
    // }
}


let num1 = null;
let operator = null;
let num2 = null;
let newCalculation = false;
let currentNumber = "";

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', recordNumbers));