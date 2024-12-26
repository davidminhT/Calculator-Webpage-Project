const ButtonBox = document.querySelector("#ButtonBox");
const DigitBox = document.querySelector("#DigitBox");
const DisplayBox = document.querySelector("#DisplayBox");
const ResultBox = document.querySelector("#ResultBox")

var numA = "";
var numB = "";
var CurrentResult;
var CurrentOperator;
var OperatorActive = false;

//Operation
const add = (a, b) => a+b;

const subtract = (a, b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a, b) => a/b;

const operate = (operator, a, b) => {
    a = Number(a);
    b = Number(b);
    switch(operator)
    {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
};

//Setup the operator buttons
const operators = ['+', '-', '*', '/', '=', 'clear']
function setupOperatorButtons() {
    for(let operator of operators)
    {   
        const Button = document.createElement("button");
        Button.className = "OperatorButton";
        Button.textContent = operator;
        Button.addEventListener("click", () => {
            if("+-*/".includes(Button.textContent))
            {
                UpdateCurrentOperator(Button.textContent);
            }
            else if(Button.textContent == "=")
            {
                UpdateResult();
            }
            else
            {
                clear();
            }
        });
        ButtonBox.appendChild(Button);
    }
}

function setupDigitButtons() {
    for(let i = 0; i <= 9; i++)
    {
        const Button = document.createElement("button");
        Button.className = "DigitButton";
        Button.textContent = i;
        Button.addEventListener("click", () => UpdateDigits(Button.textContent));
        DigitBox.appendChild(Button);
    }
}

function UpdateDigits(num) {
    if(OperatorActive == false)
    {
        numA += String(num);
        console.log(numA);
        DisplayBox.textContent += String(num);
    }
    else if(OperatorActive == true)
    {
        numB += String(num);
        console.log(numB);
        DisplayBox.textContent += String(num);
    }
}

function UpdateCurrentOperator(operator) {
    if(OperatorActive == true)
    {
        UpdateResult();
        console.log(OperatorActive)
        return;
    }
    OperatorActive = true;
    DisplayBox.textContent = "";
    CurrentOperator = operator;
    console.log(OperatorActive)
}

function UpdateResult() {
    OperatorActive = false;
    DisplayBox.textContent = "";
    ResultBox.textContent = operate(CurrentOperator, numA, numB);
    numA = ResultBox.textContent;
}

function clear() {
    numA = "";
    numB = "";
    CurrentResult;
    CurrentOperator;
    OperatorActive = false;
    DisplayBox.textContent = "";
    ResultBox.textContent = 0;

}
window.onload = () => {
    setupOperatorButtons();
    setupDigitButtons();
};