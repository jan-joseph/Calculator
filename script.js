const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperators = document.querySelectorAll("[data-operator]");
const btnEqual = document.querySelector("[data-equal]");
const btnClear = document.querySelector("[data-clear]");
const btnDelete = document.querySelector("[data-delete]");
const btnDot = document.querySelector("[data-dot]");
const screen = document.querySelector(".screen");

let currentOperation = '';
let previousOperand = 0, currentOperand;
let screenRetain = true;

window.addEventListener('keydown', findKey);
btnNumbers.forEach(btn => btn.addEventListener('click',() => addNumber(btn.textContent)));
btnOperators.forEach(btn => btn.addEventListener('click', () => setOperator (btn.textContent)))
btnEqual.addEventListener('click',() => evaluate())
btnClear.addEventListener('click', () => clear());
function findKey(e) {
    if (e.key >= 0 && e.key <= 9) addNumber(e.key);
    if (e.key === ".") addDot();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteNumber(e.key);
    if (e.key === "Escape") clear();   
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperator(e.key);
}

function addNumber(n) {
    if(screen.textContent == '0' || !screenRetain) {
        setScreen(n);
        screenRetain = true;
    } else {
        setScreen(screen.textContent.concat(n));
    }
    currentOperand = screen.textContent;
    console.log(`current - ${currentOperand}`);
}

function setOperator(op) {
    screenRetain = false;
    if (previousOperand != '0') evaluate();
    currentOperation = op;
    previousOperand = screen.textContent;
    console.log(`prev - ${previousOperand}`);
}

function clear() {
    setScreen(0);
    previousOperand = 0;
}

function evaluate() {
    let result;
    if ( currentOperation === "÷" || currentOperation === "/") result = divide(previousOperand,currentOperand);
    if ( currentOperation === "x" || currentOperation === "*") result = multiply(previousOperand,currentOperand);
    if ( currentOperation === "-" ) result = subtract(previousOperand,currentOperand);
    if ( currentOperation === "+" ) result = add(+previousOperand,+currentOperand);

    previousOperand = result;
    console.log("evaluate");
    setScreen(result);
    screenRetain = false;
    console.log(result);
}
function setScreen(n) {
    screen.textContent = n;
}
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b === 0)?alert("Divide by 0 is not possible"): a/b;