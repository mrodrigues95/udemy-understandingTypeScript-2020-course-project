// const button = document.querySelector('button');

// if (button) {
//     button.addEventListener('click', () => {
//         console.log('clicked!');
//     });    
// }

const userName = 'Marcus';
let age = 24;

const add = (a: number, b: number) => a + b;
console.log(add(2, 5));

const printOutput = (output: string | number) => console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

printOutput(add(5, 2));