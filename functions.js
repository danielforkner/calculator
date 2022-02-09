// global variables
let functions = [];
let inputArr = [];
let input = '';
let result = 0;
let display = `0`;

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
    display = `${result}`
    input = result;
    inputArr = [];
};

// calculator functions
const clear = () => {
    inputArr = [];
    functions = [];
    display = '0';
    input = '0';
}

// User Interface
const buttons = document.querySelectorAll('.calcBtn');
const displayBox = document.querySelector('.display');


buttons.forEach(btn => {
    btn.addEventListener('click', (e) => clickButton(e.target.id));
});

const clickButton = function(id) {
    if (display === '0') {display = ''}
    switch (id) {
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
        // Calculator functions
        case 'btnAdd':
            functions.push('add');    
            display = display.concat(' + ');
            inputArr.push(parseFloat(input));
            input = '';
            break;
        case 'btnSubtract':
            functions.push('subtract');    
            display = display.concat(' - ');
            inputArr.push(parseFloat(input));
            input = '';
            break;
        case 'btnMultiply':
            functions.push('multiply');    
            display = display.concat(' * ');
            inputArr.push(parseFloat(input));
            input = '';
            break;
        case 'btnDivide':
            functions.push('divide');    
            display = display.concat(' / ');
            inputArr.push(parseFloat(input));
            input = '';
            break;
        case 'btnOperate':
            inputArr.push(parseFloat(input));
            operate();
            break;
        case 'btnDelete':
            if (display.length === 1 || display.length === 0) {
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
    displayBox.innerText = display;
} 
