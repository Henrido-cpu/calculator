
function add(num1, num2){
    return +num1 + +num2;
}

function subtract(num1, num2){
    return +num1 - +num2;
}

function multiply(num1, num2){
    return +num1 * +num2;
}

function divide(num1, num2){
    return +num1 / +num2;
}

function clearAll(){
    num1 = "";
    num2 = "";
    operator = "";
    equalBtnPressed = false;
    screenOutput.textContent = "";
}
 

let num1 = "";
let operator = "";
let num2 = "";

function operate(num1, operator, num2){

    switch(operator){
        case "+": {
            return add(num1, num2);
            break;
        }
        case "-": {
            return subtract(num1, num2);
            break;
        }
        case "/": {
            return divide(num1, num2);
            break;
        }
        case "x": {
            return multiply(num1, num2);
            break;
        }
    }
}

const screenOutput = document.querySelector(".screen p");

let equalBtnPressed = false;
const equalBtn = document.querySelector(".equals");
equalBtn.addEventListener("click", ()=>{
    if(operator && num1 && num2){
        equalBtnPressed = true;
        screenOutput.textContent = "";
        num1 = operate(num1, operator, num2);
        screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
        num2 = "";
        operator = "";
        equalBtnPressed = false;
        
    }
});


const operatorBtns = document.querySelectorAll(".right-side button");
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", (e)=>{

    if(num1 && num2 && operator){
        num1 = operate(num1, operator, num2);
        screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
        num2 = "";
        operator = "";
        equalBtnPressed = false;
    }
    
    if(num1){
        operator = "";
        operator = e.target.textContent;
    }


}))

const arr = [];

const numberBtns = document.querySelectorAll(".left-side button");
numberBtns.forEach(numberBtn => numberBtn.addEventListener("click", (e)=>{
    if(e.target.textContent !== "=" && e.target.textContent !== "."){
        const value = e.target.textContent;
        console.log(value);
        if(!num1 || !operator){
            num1 += value;
            screenOutput.textContent = num1;
            console.log(num1);
        }else if(num1 && !equalBtnPressed){
            num2 += value;
            screenOutput.textContent = num2; 
            console.log("num2 pressed");
        }
    }
}))

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", clearAll);

