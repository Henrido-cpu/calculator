
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

function handleOperatorBtnsAndKeys(e){

    equalBtnPressed = false;
    if(num1 && num2 && operator){
        num1 = operate(num1, operator, num2);
        screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
        num2 = "";
        operator = "";
    }
    
    clearOperatorActiveStates()

    if(num1){
        operator = "";
        operator = e.target.textContent;
        e.target.classList.add("selected");
    }

}

function handleNumberBtnsAndKeys(e){
    
    clearOperatorActiveStates();
    const value = "";
    if(e.target.type === "click"){
        value = e.target.textContent;
    }else if(e.target.type === "keydown"){
        
        numberBtns.forEach(btn => {
            if(btn.textContent === e.key){
                btn.classList.add("selected");
                setTimeout(()=>{
                    btn.classList.remove("selected");
                }, 100)
                value = e.key;
            }
        })

    }

    if(e.target.textContent !== "="){
        console.log(value);
        if(value === "." && !screenOutput.textContent.includes(".")){
            if(num2){
                num2 += value;
                screenOutput.textContent = num2;
            }else if(num1){
                num1 += value;
                screenOutput.textContent = num1;
            }
        }
        else if(equalBtnPressed){
            console.log("works");
            clearAll();
            num1 += value;
            screenOutput.textContent = num1;
        }
        else if(value !== "=" && value !== "." && !equalBtnPressed){

            if(num1 && operator){
                num2 += value;
                screenOutput.textContent = num2; 
                console.log("num2 pressed"); 
            }else if(!operator && !num2){
                num1 += value;
                screenOutput.textContent = num1;
            }
        }
    }

}

function backSpace(){
    if(!equalBtnPressed){
        num1 = num1.slice(0, -1);
        screenOutput.textContent = num1;
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
backSpace.addEventListener("click", backSpace)

/*Keyboard support*/

function translateKeyToNum(e){
    numberBtns.forEach(btn => {
        console.log(e.key);
        if(btn.textContent === e.key && e.key !== "." && !equalBtnPressed){
            clearOperatorActiveStates();
            btn.classList.add("selected");
            setTimeout(()=>{
                btn.classList.remove("selected");
            }, 100)
            if(!num2 && !operator){
                num1 += btn.textContent;
                screenOutput.textContent = num1;
            }
            else if(num1 && operator){
                num2 += btn.textContent;
                screenOutput.textContent = num2;
            }
        }else if(e.key === "." && !screenOutput.textContent.includes(".")){
            if(!num2 && !operator){
                num1 += ".";
                screenOutput.textContent = num1;
            }else if(num1 && operator){
                num2 += ".";
                screenOutput.textContent = num2;
            }
        }else if(equalBtnPressed && e.key === btn.textContent){
            console.log("works");
            clearAll();
            num1 += btn.textContent;
            screenOutput.textContent = num1;
        }
    })
}

function translateKeyToOperator(e){
    operatorBtns.forEach(btn => {
        console.log(e.key)

        if(e.key === btn.textContent){
            equalBtnPressed = false;
            if(num1 && num2 && operator){
                num1 = operate(num1, operator, num2);
                screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
                num2 = "";
                operator = "";
                equalBtnPressed = false;
            }

            clearOperatorActiveStates();

            if(num1){
                operator = "";
                operator = btn.textContent;
                btn.classList.add("selected");
            }
        }else if(e.key === "Enter" && num1 && num2 && operator){
            equalBtn.classList.add("selected");
            setTimeout(()=>{
                equalBtn.classList.remove("selected");
            }, 100)
            equalBtnPressed = true;
            screenOutput.textContent = "";
            num1 = operate(num1, operator, num2);
            screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
            num2 = "";
            operator = "";
        }
    })
}

function handleBackSpaceEvent(e){
    if(!equalBtnPressed){
        if(e.key === "Backspace"){
            backSpace.classList.add("selected");
            setTimeout(()=>{
                backSpace.classList.remove("selected");
            }, 100)
            num1 = num1.slice(0, -1);
            screenOutput.textContent = num1;
        }      
    }
}

document.addEventListener("keydown", (e)=>{
    translateKeyToNum(e);
    translateKeyToOperator(e);
    handleBackSpaceEvent(e);
})



