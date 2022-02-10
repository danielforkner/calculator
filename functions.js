window.addEventListener('keydown', keyPress)

// global variables
let functions = [];
let inputArr = [];
let input = '';
let result = 0;
let display = `0`;
let isDot = false; // does not allow a '.' if there already is one
let isResult = false; // does not allow modifying (e.g. DEL) a returned result
let readyToOperate = false; // does not allow multiple operations without input

// operators
const add = (a, b) => a + b; 
const subtract = (a, b) => a - b; 
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// evaluate the operations
const operate = function() {
    result = inputArr.reduce((acc, el) => {
        switch (functions.shift()) {
            case 'add': 
                return add(acc, el);
            case 'subtract':
                return subtract(acc, el);
            case 'multiply':
                return multiply(acc, el);
            case 'divide':
                return divide(acc, el);
        }
    });
    // update history, update display, and reset variables 
    updateHistory(display, result);
    display = `${result.toFixed(2)}`;
    input = result;
    inputArr = [];
    isDot = false;
    isResult = true;
};

const clear = () => {
    inputArr = [];
    functions = [];
    display = '0';
    input = '0';
    isDot = false;
    isResult = false;
    readyToOperate = false;
};

updateHistory = function(display, result) {
    let historyContainer = document.querySelector('body');
    let historyDiv = document.createElement('div')
    historyDiv.innerText = `${display} = ${result.toFixed(2)}`;
    historyDiv.classList.add('history');
    historyDiv.style.left = `${100 * Math.random()}%`;
    historyDiv.style.top = `${100 * Math.random()}%`;
    historyContainer.append(historyDiv);
}

// Buttons
const buttons = document.querySelectorAll('.calcBtn');
const displayBox = document.querySelector('.display');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => clickButton(e.target.id));
});

const clickButton = function(id) {
    let btn = document.getElementById(id)
    if (btn.classList.contains('num') && !isResult) {
        if (display === '0') {display = ''};
        switch (id) {
            // Numbers
            case 'btn1':
                display = display.concat('1');
                input = input.concat('1');
                readyToOperate = true;
                break;
            case 'btn2':
                display = display.concat('2');
                input = input.concat('2');
                readyToOperate = true;
                break;
            case 'btn3':
                display = display.concat('3');
                input = input.concat('3');
                readyToOperate = true;
                break;
            case 'btn4':
                display = display.concat('4');
                input = input.concat('4');
                readyToOperate = true;
                break;
            case 'btn5':
                display = display.concat('5');
                input = input.concat('5');
                readyToOperate = true;
                break;
            case 'btn6':
                display = display.concat('6');
                input = input.concat('6');
                readyToOperate = true;
                break;
            case 'btn7':
                display = display.concat('7');
                input = input.concat('7');
                readyToOperate = true;
                break;
            case 'btn8':
                display = display.concat('8');
                input = input.concat('8');
                readyToOperate = true;
                break;
            case 'btn9':
                display = display.concat('9');
                input = input.concat('9');
                readyToOperate = true;
                break;
            case 'btn0':
                display = display.concat('0');
                input = input.concat('0');
                break;
            case 'btnDot':
                if (isDot) {break;}
                display = display.concat('.');
                input = input.concat('.');
                isDot = true;
                break;
        };
    } else if (btn.classList.contains('operator') && readyToOperate) {
        switch (id) {
            // operator functions
            case 'btnAdd':
                functions.push('add');    
                display = display.concat(' + ');
                inputArr.push(parseFloat(input));
                resetOperator();
                break;
            case 'btnSubtract':
                functions.push('subtract');    
                display = display.concat(' - ');
                inputArr.push(parseFloat(input));
                resetOperator();
                break;
            case 'btnMultiply':
                functions.push('multiply');    
                display = display.concat(' * ');
                inputArr.push(parseFloat(input));
                resetOperator();
                break;
            case 'btnDivide':
                functions.push('divide');    
                display = display.concat(' / ');
                inputArr.push(parseFloat(input));
                resetOperator();
                break;    
            case 'btnOperate':
                inputArr.push(parseFloat(input));
                operate();
                break;
        // case 'btnSign':
        //     input = input * -1;
        //     how to update the display appropriately??
        //     break;
        };
    } else {
        switch (id) {
            // other functions
            case 'btnClear':
                clear();
                break;
            case 'btnDelete':
                if (isResult) {
                    return;
                } else if (display.length === 1 || display.length === 0) {
                    display = '0'
                } else if (display[display.length - 1] === ' ') {
                    return;
                } else {
                    display = display.substring(0, display.length - 1);
                }
                break;
        };
    }
    displayBox.innerText = display;
} 

function resetOperator() {
    input = '';
    isDot = false;
    isResult = false;
    readyToOperate = false;
}

function keyPress(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 96: 
        case 48: 
            clickButton('btn0');
            break;
        case 97:
        case 49: 
            clickButton('btn1');
            break;
        case 98:
        case 50: 
            clickButton('btn2');
            break;
        case 99: 
        case 51:
            clickButton('btn3');
            break;
        case 100:
        case 52: 
            clickButton('btn4');
            break;
        case 101:
        case 53:
            clickButton('btn5');
            break;
        case 102:
        case 54: 
            clickButton('btn6');
            break;
        case 103:
        case 55: 
            clickButton('btn7');
            break;
        case 104:
        case 56: 
            clickButton('btn8');
            break;
        case 105:
        case 57: 
            clickButton('btn9');
            break;
        case 110:
        case 190: 
            clickButton('btnDot');
            break;
        case 106:
            clickButton('btnMultiply');
            break;
        case 107:
        case 187:
            clickButton('btnAdd');
            break;
        case 109:
        case 189:
            clickButton('btnSubtract');
            break;
        case 111:
        case 191:
            clickButton('btnDivide');
            break;
        case 13:
            clickButton('btnOperate');
            break;
        case 46:
            clickButton('btnClear');
            break;
        case 8:
            clickButton('btnDelete');
            break;
    }
}