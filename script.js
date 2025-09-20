
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

const screenOutput = document.querySelector(".screen p");

let equalBtnPressed = false;
const equalBtn = document.querySelector(".equals");
equalBtn.addEventListener("click", ()=>{
    if(operator && num1 && num2){
        equalBtnPressed = true;
        screenOutput.textContent = "";
        num1 = operate(num1, operator, num2);
        screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
        num1 = String(num1);
        num2 = "";
        operator = "";
        equalBtnPressed = false;
        
    }
});

function clearOperatorActiveStates(){
    operatorBtns.forEach(btn=>btn.classList.remove("selected"));
}

const operatorBtns = document.querySelectorAll(".right-side button");
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", (e)=>{

    if(num1 && num2 && operator){
        num1 = operate(num1, operator, num2);
        screenOutput.textContent = Math.round(Number(num1) * 100000000) / 100000000;
        num2 = "";
        operator = "";
        equalBtnPressed = false;
    }
    
    clearOperatorActiveStates()

    if(num1){
        operator = "";
        operator = e.target.textContent;
        e.target.classList.add("selected");
    }


}))

const arr = [];

const numberBtns = document.querySelectorAll(".left-side button");
numberBtns.forEach(numberBtn => numberBtn.addEventListener("click", (e)=>{

    clearOperatorActiveStates();
    
    if(e.target.textContent !== "="){
        const value = e.target.textContent;
        console.log(value);
        if(value === "." && !screenOutput.textContent.includes(".")){
            if(num2){
                num2 += value;
                screenOutput.textContent = num2;
            }else if(num1){
                num1 += value;
                screenOutput.textContent = num1;
            }
        }else if(value !== "=" && value !== "."){
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
    }

}))

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", clearAll);

const backSpace = document.querySelector(".back-space");
backSpace.addEventListener("click", ()=>{
    num1 = num1.slice(0, -1);
    screenOutput.textContent = num1;
});

/*Keyboard support*/

function translateKeyToNum(e){
    numberBtns.forEach(btn => {
        console.log(e.key);
        if(btn.textContent === e.key && e.key !== "."){
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
        }
    })
}

function translateKeyToOperator(e){
    operatorBtns.forEach(btn => {
        console.log(e.key)

        if(e.key === btn.textContent){

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
            num1 = String(num1)
            num2 = "";
            operator = "";
            equalBtnPressed = false;
        }
    })
}

function handleBackSpaceEvent(e){
    if(e.key === "Backspace"){
        backSpace.classList.add("selected");
        setTimeout(()=>{
            backSpace.classList.remove("selected");
        }, 100)
        num1 = num1.slice(0, -1);
        screenOutput.textContent = num1;
    }
}

document.addEventListener("keydown", (e)=>{
    translateKeyToNum(e);
    translateKeyToOperator(e);
    handleBackSpaceEvent(e);
})



