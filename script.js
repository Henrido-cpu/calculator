
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function clear(){
    num1 = null;
    num2 = null;
    operator = null;
    screenOutput.textContent = "";
}
 
let num1 = null;
let operator = null;
let num2 = null;

function operate(num1, operator, num2){

    switch(operator){
        case "+": {
            return add(num1, num2);
        }
    }
}

const screenOutput = document.querySelector(".screen p")

const equalBtn = document.querySelector(".equals");
equalBtn.addEventListener("click", ()=>{
    if(operator && num1 && num2){
        screenOutput.textContent = "";
        screenOutput.textContent = operate(num1, operator, num2);
    }
});

const operatorBtns = document.querySelectorAll(".right-side button");
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", (e)=>{
    operator = "";
    if(num1 && !num2){
        operator = e.target.textContent;
    }
}))

const arr = [];

const numberBtns = document.querySelectorAll(".left-side button");
numberBtns.forEach(numberBtn => numberBtn.addEventListener("click", (e)=>{
    if(e.target.textContent !== "=" && e.target.textContent !== "."){
        screenOutput.textContent = "";
        const value = e.target.textContent;
        console.log(value);
        if(!num1){
            screenOutput.textContent = value;
            num1 = +value;
        }else if(num1 && !num2){
            screenOutput.textContent = value;
            num2 = +value;
        }
    }
}))

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", clear);

