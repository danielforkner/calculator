// global variables
let functions = [];
let inputArr = [];
let input = '';
let result = 0;
let display = `0`;
let isDot = false; // does not allow a '.' if there already is one
let isResult = false; // does not allow modifying (e.g. DEL) a returned result

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
    display = `${result}`;
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
};

updateHistory = function(display, result) {
    let historyContainer = document.querySelector('.historyContainer');
    let historyDiv = document.createElement('div')
    historyDiv.innerText = `${display} = ${result}`;
    historyContainer.append(historyDiv);
}

// User Interface
const buttons = document.querySelectorAll('.calcBtn');
const displayBox = document.querySelector('.display');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => clickButton(e));
});

const clickButton = function(btn) {
    if (display === '0') {display = ''};
    if (btn.target.classList.contains('num') && !isResult) {
        switch (btn.target.id) {
            // Numbers
            case 'btn1':
                display = display.concat('1');
                input = input.concat('1');
                break;
            case 'btn2':
                display = display.concat('2');
                input = input.concat('2');
                break;
            case 'btn3':
                display = display.concat('3');
                input = input.concat('3');
                break;
            case 'btn4':
                display = display.concat('4');
                input = input.concat('4');
                break;
            case 'btn5':
                display = display.concat('5');
                input = input.concat('5');
                break;
            case 'btn6':
                display = display.concat('6');
                input = input.concat('6');
                break;
            case 'btn7':
                display = display.concat('7');
                input = input.concat('7');
                break;
            case 'btn8':
                display = display.concat('8');
                input = input.concat('8');
                break;
            case 'btn9':
                display = display.concat('9');
                input = input.concat('9');
                break;
            // case 'btnSign':
            //     input = input * -1;
            //     how to update the display appropriately??
            //     break;
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
    }
        // Calculator functions
    else {
        switch (btn.target.id) {
            case 'btnAdd':
                functions.push('add');    
                display = display.concat(' + ');
                inputArr.push(parseFloat(input));
                input = '';
                isDot = false;
                isResult = false;
                break;
            case 'btnSubtract':
                functions.push('subtract');    
                display = display.concat(' - ');
                inputArr.push(parseFloat(input));
                input = '';
                isDot = false;
                isResult = false;
                break;
            case 'btnMultiply':
                functions.push('multiply');    
                display = display.concat(' * ');
                inputArr.push(parseFloat(input));
                input = '';
                isDot = false;
                isResult = false;
                break;
            case 'btnDivide':
                functions.push('divide');    
                display = display.concat(' / ');
                inputArr.push(parseFloat(input));
                input = '';
                isDot = false;
                isResult = false;
                break;
            case 'btnOperate':
                inputArr.push(parseFloat(input));
                operate();
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
            case 'btnClear':
                clear();
                break;     
        };
    };
    displayBox.innerText = display;
} 
