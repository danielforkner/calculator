// global variables
let input = [1, 5, 2, 76, 19];
const functions = ['add', 'add', 'subtract', 'add'];
let result = 0;
// let display = `${result}`;

// operators
const add = (a, b) => a + b; 
const subtract = (a, b) => a - b; 
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// evaluate the operations
const operate = function() {
    input.reduce((acc, el) => {
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
        result = acc;
        input = [result];
        // displayScreen(result);
    }, 0);
};

// calculator functions
const clear = () => input = [];
// const displayScreen = (str) => display = result.concat(` ${str}`) 

operate();
console.log(result);
console.log(functions);
console.log(input);
// console.log(display);
