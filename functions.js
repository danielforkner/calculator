window.addEventListener('keydown', keyPress)

// global variables
let functions = [];
let inputArr = [];
let input = '';
let result = 0;
let display = `0`;
let isDot = false; // does not allow a '.' if there already is one
let fromEqual = false; // does not allow modifying (e.g. DEL) a returned result
let readyToOperate = false; // does not allow multiple operations without input (e.g. '++++++')
let isSign = false; // allows the toggling of the sign operator

// operators
const add = (a, b) => a + b; 
const subtract = (a, b) => a - b; 
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// evaluate the operations
const operate = function() {
    result = inputArr.reduce((acc, el) => {
        switch (functions.shift(2)) {
            case '+': 
                return add(acc, el);
            case '-':
                return subtract(acc, el);
            case '*':
                return multiply(acc, el);
            case '/':
                return divide(acc, el);
        }
    });
    // update history, update display, and reset variables 
    updateHistory(display, result);
    display = `${result.toFixed()}`;
    input = result;
    inputArr = [];
    isDot = false;
    fromEqual = true;
};

updateHistory = function(display, result) {
    let historyDiv = document.createElement('div')
    historyDiv.innerText = `${display} = ${result.toFixed(2)}`;
    historyDiv.classList.add('history');
    historyDiv.style.left = `${100 * Math.random()}%`;
    historyDiv.style.top = `${100 * Math.random()}%`;
    document.querySelector('body').append(historyDiv);
}

// Buttons
const buttons = document.querySelectorAll('.calcBtn');
const displayBox = document.querySelector('.display');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => clickButton(e.target.id));
});

const clickButton = function(id) {
    let btn = document.getElementById(id)
    if (btn.classList.contains('num') && !fromEqual) {
        if (display === '0') {
            display = '';
            input = '';
        };
        readyToOperate = true;
        switch (id) {
            // Numbers
            case 'btn1':
                updateInput('1');
                break;
            case 'btn2':
                updateInput('2');
                break;
            case 'btn3':
                updateInput('3');
                break;
            case 'btn4':
                updateInput('4');
                break;
            case 'btn5':
                updateInput('5');
                break;
            case 'btn6':
                updateInput('6');
                break;
            case 'btn7':
                updateInput('7');
                break;
            case 'btn8':
                updateInput('8');
                break;
            case 'btn9':
                updateInput('9');
                break;
            case 'btn0':
                updateInput('0');
                break;
            case 'btnDot':
                if (isDot) {break;}
                updateInput('.');
                isDot = true;
                readyToOperate = false;
                break;
            case 'btnSign':
                changeSign();
                break;
        };
    } else if (btn.classList.contains('operator') && readyToOperate) {
        switch (id) {
            // operator functions
            case 'btnAdd':
                updateOperator('+');
                break;
            case 'btnSubtract':
                updateOperator('-');
                break;
            case 'btnMultiply':
                updateOperator('*');
                break;
            case 'btnDivide':
                updateOperator('/');
                break;    
            case 'btnOperate':
                inputArr.push(parseFloat(input));
                operate();
                break;
        };
    } else {
        switch (id) {
            // other functions
            case 'btnClear':
                clear();
                break;
            case 'btnDelete':
                del();
                break;
        };
    }
    displayBox.innerText = display;
}; 

function clear() {
    inputArr = [];
    functions = [];
    display = '0';
    input = '0';
    isDot = false;
    fromEqual = false;
    readyToOperate = false;
};

function del() {
    if (fromEqual) {
        return;
    } else if (display.length === 1 || display.length === 0) {
        display = '0';
        input = '0';
    } else if (display[display.length - 1] === ' ') {
        return;
    } else {
        display = display.substring(0, display.length - 1);
        input = input.substring(0, input.length - 1);
    }
}

function updateOperator(operation) {
    functions.push(operation);    
    display = display.concat(` ${operation} `);
    inputArr.push(parseFloat(input));
    resetOperator();
}

function updateInput(num) {
    display = display.concat(num);
    input = input.concat(num);
}

function resetOperator() {
    input = '';
    isDot = false;
    fromEqual = false;
    readyToOperate = false;
    isSign = false;
}

function changeSign() {
    let sign = '-';
    if (display === 0) {display = '0';}
    else if (functions.length === 0) {
        if (isSign === false) {
            input = sign.concat(input);
            display = input;
            isSign = true;    
        } else {
            input = input.substring(1);
            display = input;
            isSign = false;
        }
    } else {
        // find the index of the last ' ' in the display string so you can add the sign after it
        let index = display.length - 1;
        display = display.split('');
        for (let i = index; i > 0; i--) {
            if (display[i] === ' ') {
                // remove sign
                if (isSign === true) {
                    display.splice(i + 1, 1);
                    display = display.join('');
                    input = input.substring(1);
                    isSign = false;
                    return;
                // add sign
                } else {
                    let arr1 = display.slice(0, i+1);
                    let arr2 = display.slice(i+1);
                    arr2.unshift(sign);
                    display = arr1.join('').concat(arr2.join(''));
                    console.log(arr2);
                    input = sign.concat(input);
                    isSign = true;
                    return;
                }
            }
        }
    }
}

function keyPress(event) {
    console.log(event.key)
    switch (event.key) {
        case '0':
            clickButton('btn0');
            break;
        case '1': 
            clickButton('btn1');
            break;
        case '2':
            clickButton('btn2');
            break;
        case '3':
            clickButton('btn3');
            break;
        case '4':
            clickButton('btn4');
            break;
        case '5':
            clickButton('btn5');
            break;
        case '6':
            clickButton('btn6');
            break;
        case '7':
            clickButton('btn7');
            break;
        case '8':
            clickButton('btn8');
            break;
        case '9':
            clickButton('btn9');
            break;
        case '.': 
            clickButton('btnDot');
            break;
        case '*':
            clickButton('btnMultiply');
            break;
        case '+':
            clickButton('btnAdd');
            break;
        case '-':
            clickButton('btnSubtract');
            break;
        case '/':
            clickButton('btnDivide');
            break;
        case 'Enter':
        case '=':
            clickButton('btnOperate');
            break;
        case 'Delete':
            clickButton('btnClear');
            break;
        case 'Backspace':
            clickButton('btnDelete');
            break;
    }
};