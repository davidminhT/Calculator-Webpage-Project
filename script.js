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
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch(operator)
    {
        case '+':
            result = add(a, b);
            break;
        case '−':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
    }
    return Number.isInteger(result) ? result : Math.round(result * 100) / 100;
};

//Setup the operator buttons
const operators = ['.', '+', '−', '×', '÷', '=', 'clear']
function setupOperatorButtons() {
    for(let operator of operators)
    {   
        const Button = document.createElement("button");
        Button.className = "OperatorButton";
        Button.textContent = operator;
        Button.addEventListener("click", () => {
            if("+−×÷".includes(Button.textContent))
            {
                if(numA != "")
                    UpdateCurrentOperator(Button.textContent);
            }
            else if(Button.textContent == "=")
            {
                if(numA != "")
                    UpdateResult();
            }
            else if(Button.textContent == ".")
            {
                AddDecimal();
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
    //if the user do operation after operation, the OperatorActive is always active.
    if(OperatorActive) //Runs when user do continuous operator calls
    {
        LastOperationBox.textContent = `${numA} ${CurrentOperator} ${numB} =`;
        numA = operate(CurrentOperator, numA, numB);
        numB = "";
        DisplayBox.textContent = numA;
    }
    //First operator call after a "fresh state", 
    //when user explicitly click = buttons
    else if(OperatorActive == false) 
    {
        OperatorActive = true;
    }
    DisplayBox.textContent += operator;
    CurrentOperator = operator;
}

//Add Decimal after current number.
function AddDecimal()
{
    if(OperatorActive && !(numB.includes('.')))
    {
        numB +='.';
        DisplayBox.textContent += '.';
    }
    //If numA previously has no decimal place then run
    else if(!(numA.includes('.'))) 
    {
        numA += '.';
        DisplayBox.textContent = numA;
    }
}
//Update the result activates when pressing =
function UpdateResult() {
    LastOperationBox.textContent = `${numA} ${CurrentOperator} ${numB} =`;
    numA = operate(CurrentOperator, numA, numB);
    numB = "";
    OperatorActive = false;
    DisplayBox.textContent = numA;
}

//Clear the calculator
function clear() {
    numA = "";
    numB = "";
    LastOperationBox.textContent = "";
    CurrentOperator = "";
    OperatorActive = false;
    DisplayBox.textContent = "";
}

window.onload = () => {
    setupOperatorButtons();
    setupDigitButtons();
};