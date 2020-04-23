/* CORE TYPES
number, string, boolean, object, Array, Tuple, Enum, Any
*/

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'Marcus',
//     age: 24,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author'] // tuple
// };

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person = {
    name: 'Marcus',
    age: 24,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1] = 10;
// person.role = [0, 'admin'];

let favouriteActivites: string[];
favouriteActivites = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
    console.log('is admin...');
}