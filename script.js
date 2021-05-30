const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperators = document.querySelectorAll("[data-operator]");
const btnEqual = document.querySelector("[data-equal]");
const btnClear = document.querySelector("[data-clear]");
const btnDelete = document.querySelector("[data-delete]");
const btnDot = document.querySelector("[data-dot]");
const screen = document.querySelector(".screen");

let currentOperation = '';
let previousOperand = 0, currentOperand;
let screenRetain = false;

window.addEventListener('keydown', findKey);
btnNumbers.forEach(btn => btn.addEventListener('click',() => addNumber(btn.textContent)));
btnOperators.forEach(btn => btn.addEventListener('click', () => setOperator (btn.textContent)))
btnEqual.addEventListener('click',() => operate())
btnClear.addEventListener('click', () => clear());
btnDelete.addEventListener('click',() => deleteNumber());
btnDot.addEventListener('click', () => addDot());
// Finding the Keydown from the Keyboard
function findKey(e) {
    if (e.key >= 0 && e.key <= 9) addNumber(e.key);
    if (e.key === ".") addDot();
    if (e.key === "=" || e.key === "Enter") operate();
    if (e.key === "Backspace") deleteNumber();
    if (e.key === "Escape") clear();   
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperator(e.key);
}
// Adding the Keydown/Button clicked to the Screen Text
function addNumber(n) {
    if(screen.textContent === '0' || !screenRetain) {
        setScreen(n);
        screenRetain = true;
    } else {
        setScreen(screen.textContent.concat(n));
    }
    currentOperand = screen.textContent;
}
// Set the operation to be performed when clicked on button/keyboard keydown
function setOperator(op) {
    screenRetain = false;
    if (previousOperand != '0' && currentOperation != '') operate();
    currentOperation = op;
    previousOperand = screen.textContent;
}
// Clear the Screen
function clear() {
    setScreen(0);
    previousOperand = 0;
}
// Actual Operate fucntion where all calculation and results are stored
function operate() {
    let result;
    if ( currentOperation === "÷" || currentOperation === "/") result = divide(previousOperand,currentOperand);
    if ( currentOperation === "x" || currentOperation === "*") result = multiply(previousOperand,currentOperand);
    if ( currentOperation === "-" ) result = subtract(previousOperand,currentOperand);
    if ( currentOperation === "+" ) result = add(+previousOperand,+currentOperand);

    currentOperation = '';
    previousOperand = result;
    setScreen(result);
    screenRetain = false;
}
// Set the Screen Text Content with the passed parameter
function setScreen(n) {
    screen.textContent = n;
}
// Deleting the LSB of the entered number in Screen Text Context
function deleteNumber() {
    let result = screen.textContent.slice(0, -1);
    setScreen(result);
    currentOperand = result;
}
// Adding a Decimal Dot to the Number
function addDot() {
    if (screen.textContent.includes(".") && screenRetain) return;
    if (!screenRetain) {
        screenRetain = true;
        setScreen("0.")
        return;
    }
    setScreen(screen.textContent + ".");
}
// All mathematical operations to be performed
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b === "0") ? alert("Divide by 0 is not possible"): a/b;