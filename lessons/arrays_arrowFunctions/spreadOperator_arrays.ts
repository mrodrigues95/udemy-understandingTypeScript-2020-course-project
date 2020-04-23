// const button = document.querySelector('button');

// if (button) {
//     button.addEventListener('click', () => {
//         console.log('clicked!');
//     });    
// }

// const userName = 'Marcus';
// let age = 24;

// const add = (a: number, b: number) => a + b;
// console.log(add(2, 5));

// const printOutput = (output: string | number) => console.log(output);

// const button = document.querySelector('button');

// if (button) {
//     button.addEventListener('click', event => console.log(event));
// }

// printOutput(add(5, 2));

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

const person = {
    firstName: 'Marcus',
    age: 24
};

const copiedPerson = { ...person };

const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { firstName, age } = person;