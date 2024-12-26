const ButtonBox = document.querySelector("#ButtonsBox");
const DigitBox = document.querySelector("#DigitsBox");
const DisplayBox = document.querySelector("#DisplayBox");
const LastOperationBox = document.querySelector("#LastOperationBox")

var numA = ""; //Current numA
var numB = ""; //Current numB 
var CurrentOperator= ""; //Current Operator
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
    if(OperatorActive == false) //standard
    {
        numA += String(num);
        DisplayBox.textContent = numA;
    }
    else if(OperatorActive == true) //if operator is clicked
    {
        numB += String(num);
        DisplayBox.textContent += String(num);
    }
}

//Activate when an operator button is clicked
function UpdateCurrentOperator(operator) {
    if(OperatorActive) //Runs when user do continuous operator calls
    {
        numA = operate(CurrentOperator, numA, numB);
        numB = "";
        DisplayBox.textContent = numA;
        operatorActive = false;
    }
    //First operator call after a "fresh state", 
    //when user explicitly click = buttons
    //or when another operator calls complete the previous operation. 
    else if(OperatorActive == false) 
    {
        OperatorActive = true;
    }
    DisplayBox.textContent += operator;
    CurrentOperator = operator;
}

//Update the result activates when pressing =
function UpdateResult() {
    OperatorActive = false;
    numA = operate(CurrentOperator, numA, numB);
    DisplayBox.textContent = numA;
    numB = "";
}

//Clear the calculator
function clear() {
    numA = "";
    numB = "";
    CurrentOperator;
    OperatorActive = false;
    DisplayBox.textContent = "";
    ResultBox.textContent = 0;

}

window.onload = () => {
    setupOperatorButtons();
    setupDigitButtons();
};