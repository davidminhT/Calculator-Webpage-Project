const ButtonBox = document.querySelector("#ButtonBox");
const DigitBox = document.querySelector("#DigitBox");
const Display = document.querySelector("Display");
var CurrentResult = 0;

const add = (a, b) => a+b;

const subtract = (a, b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a, b) => a/b;

const operate = (operator, a, b) => {
    switch(operator)
    {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
};

const operators = ['+', '-', '*', '/', '=', 'clear']
function setupOperatorButtons() {
    for(let operator of operators)
    {   
        const Button = document.createElement("button");
        Button.className = "OperatorButton";
        Button.textContent = operator;
        ButtonBox.appendChild(Button);
    }
}

function setupDigitButtons() {
    for(let i = 0; i <= 9; i++)
    {
        const Button = document.createElement("button");
        Button.className = "DigitButton";
        Button.textContent = i;
        DigitBox.appendChild(Button);
    }
}

function DisplayInput() {

}

window.onload = () => {
    setupOperatorButtons();
    setupDigitButtons();
};