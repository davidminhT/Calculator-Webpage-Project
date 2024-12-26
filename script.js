const DisplayBox = document.querySelector("#DisplayBox");
const LastOperationBox = document.querySelector("#LastOperationBox")
const ButtonsBox = document.querySelector("#ButtonsBox");

var numA = ""; //Current numA
var numB = ""; //Current numB 
var CurrentOperator= ""; //Current Operator
var OperatorActive = false;

const ButtonSetup = [
    ["AC", "+/−", "%", "÷"],
    ["7", "8", "9", "×"], 
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    [".", "0", "="]
]

//Operation
const add = (a, b) => a+b;

const subtract = (a, b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a, b) => a/b;

const modulo = (a, b) => a%b;

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
        case '%':
            result = modulo(a, b);
            break;
    }
    return Number.isInteger(result) ? result : Math.round(result * 100) / 100;
};

function setupButtons() {
    const RowDivs = Array.from(ButtonsBox.querySelectorAll(".row"));
    for(let i = 0; i < ButtonSetup.length; i++)
    {
        for(let j = 0; j < ButtonSetup[i].length; j++)
        {
            if("0123456789".includes(ButtonSetup[i][j]))
                setupDigitButton(RowDivs[i], ButtonSetup[i][j]);
            else
                setupOperatorButton(RowDivs[i], ButtonSetup[i][j]);
        }
        //Make bottom row layered over the top row
        RowDivs[i].style.zIndex = i+1;
    }
}

//Setup the operator buttons
function setupOperatorButton(parent, operator) {
    const Button = document.createElement("button");
    Button.className = "OperatorButton";;

    //Button styling childs
    const FrontText = document.createElement("span");
    FrontText.className = "front text";
    FrontText.textContent = operator;
    FrontText.style.color = "red";
    FrontText.style.background = "rgb(66, 62, 62";
    Button.appendChild(FrontText);
    const Shadow = document.createElement("span");
    Shadow.className = "shadow";
    Button.appendChild(Shadow);
    const Edge = document.createElement("span");
    Edge.className = "edge";
    Button.appendChild(Edge);
    
    if(operator == "=")
        Button.id = "Equal";
    Button.addEventListener("click", () => {
        if("+−×÷%".includes(Button.textContent))
        {
            //Bug Fix: Error where if numA is 0 (Number) then it won't fire act as if numA is "". != changed to !==.
            if(numA !== "") 
                UpdateCurrentOperator(Button.textContent);
        }
        else if(Button.textContent == "=")
        {
            if(numA !== "")
                UpdateResult();
        }
        else if(Button.textContent == ".")
            AddDecimal();
        else if(Button.textContent == "+/−")
            ToggleSign();
        else
            clear();
    });
    parent.appendChild(Button);
}

function setupDigitButton(parent, digit) {
    const Button = document.createElement("button");
    Button.className = "DigitButton";
    
    //Button styling childs
    const FrontText = document.createElement("span");
    FrontText.className = "front text";
    FrontText.textContent = digit;
    Button.appendChild(FrontText);
    const Shadow = document.createElement("span");
    Shadow.className = "shadow";
    Button.appendChild(Shadow);
    const Edge = document.createElement("span");
    Edge.className = "edge";
    Button.appendChild(Edge);
    

    Button.style.color = "white";
    Button.addEventListener("click", () => {
        UpdateDigits(Button.textContent); 
    });
    parent.appendChild(Button);
}

function UpdateDigits(num) {
    if(OperatorActive == false) //standard
    {
        if(numA == '0') {
            numA = num;
        } else {numA += String(num);}
        DisplayBox.textContent = numA;
    }
    else if(OperatorActive == true) //if operator is clicked
    {
        if(numB == '0') {
            numB = num;
        } else {numB += String(num);}
        DisplayBox.textContent += String(num);
    }
}

//Activate when an operator button is clicked
function UpdateCurrentOperator(operator) {
    //if the user do operation after operation, the OperatorActive is always active.
    if(OperatorActive) //Runs when user do continuous operator calls
    {
        if(numB !== "")
        {   console.log("a")
            LastOperationBox.textContent = `${numA} ${CurrentOperator} ${numB} =`;
            numA = operate(CurrentOperator, numA, numB).toString();
            numB = "";
            DisplayBox.textContent = numA;
        }
        else if(numB === "")
        {
            DisplayBox.textContent = DisplayBox.textContent
                    .replace(` ${CurrentOperator} `, '');
            OperatorActive = false;
        }
    }
    //First operator call after a "fresh state", 
    //when user explicitly click = buttons
    else if(OperatorActive == false) 
    {
        OperatorActive = true;
    }
    DisplayBox.textContent += ` ${operator} `;
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

function ToggleSign()
{
    if(!OperatorActive)
    {
        numA = (-parseFloat(numA)).toString();
        DisplayBox.textContent = numA;
    }
}

//Update the result activates when pressing =
function UpdateResult() {
    //handle case where qual opeation if user haven't entered 
    //anything after operator is activated
    if(OperatorActive && numB == "") 
        CurrentOperator = ""; 

    //output last successful operation
    LastOperationBox.textContent = `${numA} ${CurrentOperator} ${numB} =`;
    
    //numB is valid and an operation IS being carried out
    if(CurrentOperator && numB !== "")
        //set numA to result. 
        numA = operate(CurrentOperator, numA, numB).toString();

    //Reset numB and OperatorActive. Output numA.
    numB = "";
    OperatorActive = false;
    DisplayBox.textContent = numA;
    console.log(numA);
}

//Clear the calculator
function clear() {
    numA = "";
    numB = "";
    LastOperationBox.textContent = "";
    CurrentOperator = "";
    OperatorActive = false;
    DisplayBox.textContent = "0";
}

window.onload = () => {
    setupButtons();
};