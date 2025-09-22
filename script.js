
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
    clearOperatorActiveStates();
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

function displayResult(){

    if(operator && num1 && num2){
        equalBtnPressed = true;
        screenOutput.textContent = "";
        num1 = operate(num1, operator, num2);
        screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
        num2 = "";
        operator = "";
    }

}

/*1 num1 + operator 2 num2 = 3 equalstate true and also num1, check if its true 
*/

function handleOperatorBtnsAndKeys(e){
    
    if(e.type === "click"){

            equalBtnPressed = false;
            if(num1 && num2 && operator){
                num1 = operate(num1, operator, num2);
                screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
                num2 = "";
                operator = "";
            }

            clearOperatorActiveStates();


            if(num1){
                operator = "";
                operator = e.target.textContent;
                e.target.classList.add("selected");
            }
    }

    if(e.type === "keydown"){
        operatorBtns.forEach(btn => {

            if(e.key === btn.textContent){
                equalBtnPressed = false;
                if(num1 && num2 && operator){
                    num1 = operate(num1, operator, num2);
                    screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
                    num2 = "";
                    operator = "";
                }

                clearOperatorActiveStates();

                if(num1){
                    operator = "";
                    operator = btn.textContent;
                    btn.classList.add("selected");
                }


            }else if(e.key === "Enter"){
                equalBtn.classList.add("selected");
                setTimeout(()=>{
                    equalBtn.classList.remove("selected");
                }, 100)
                displayResult();
            }
        })
    }

}

function handleNumberBtnsAndKeys(e){
    
    let isNum = false;
    let value = "";

    if(e.type === "click"){
        if(value !== "="){
            isNum = true;
        }
        clearOperatorActiveStates();
        value = e.target.textContent;
    }else if(e.type === "keydown"){
        clearOperatorActiveStates();
        numberBtns.forEach(btn => {
            if(btn.textContent === e.key){
                isNum = true;
                btn.classList.add("selected");
                setTimeout(()=>{
                    btn.classList.remove("selected");
                }, 100)
                value = btn.textContent;
            }
        })

    }
    
    if(isNum || value === "."){
        console.log("isnum or value is . is true");
        if(value === "." && !screenOutput.textContent.includes(".")){
            isNum = false;
            if(num2){
                num2 += value;
                screenOutput.textContent = num2;
            }else if(num1){
                num1 += value;
                screenOutput.textContent = num1;
            }
        }
        else if(equalBtnPressed && !operator && isNum && value !== "="){
            isNum = false;
            clearAll();
            num1 += value;
            screenOutput.textContent = num1;
        }
        else if(value !== "=" && value !== "." && !equalBtnPressed){
            isNum = false;
            if(num1 && operator){
                num2 += value;
                screenOutput.textContent = num2; 
            }else if(!operator && !num2){
                num1 += value;
                screenOutput.textContent = num1;
            }
        }
    }

}

function handleBackSpace(){
    if(!equalBtnPressed){
        if(!operator && !num2){
            num1 = String(num1).slice(0, -1);
            screenOutput.textContent = num1;
        }
        if(num1 && operator){
            num2 = String(num2).slice(0, -1);
            screenOutput.textContent = num2;
        }
    }
}

const screenOutput = document.querySelector(".screen p");

let equalBtnPressed = false;
const equalBtn = document.querySelector(".equals");
equalBtn.addEventListener("click", displayResult);


function clearOperatorActiveStates(){
    operatorBtns.forEach(btn=>btn.classList.remove("selected"));
}

const operatorBtns = document.querySelectorAll(".right-side button");
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", handleOperatorBtnsAndKeys));


const arr = [];

const numberBtns = document.querySelectorAll(".left-side button");
numberBtns.forEach(numberBtn => numberBtn.addEventListener("click", handleNumberBtnsAndKeys))

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", clearAll);

const backSpace = document.querySelector(".back-space");
backSpace.addEventListener("click", handleBackSpace)

/*Keyboard support*/

function handleBackSpaceEvent(e){
    if(!equalBtnPressed){
        if(e.key === "Backspace"){
            console.log("backspace event fired")
            backSpace.classList.add("selected");
            setTimeout(()=>{
                backSpace.classList.remove("selected");
            }, 100)

            if(!operator && !num2){
                num1 = String(num1).slice(0, -1);
                screenOutput.textContent = num1;
            }
            if(num1 && operator){
                num2 = String(num2).slice(0, -1);
                screenOutput.textContent = num2;
            }

        }      
    }
}

document.addEventListener("keydown", (e)=>{
    handleNumberBtnsAndKeys(e);
    handleOperatorBtnsAndKeys(e);
    handleBackSpaceEvent(e);
})



