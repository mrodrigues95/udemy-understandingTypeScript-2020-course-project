/*
JS Class Features:
- readonly properties (values cannot be changed)
- inheritance
- overriding and protected keyword
- getters/setters
- static methods
- abstract classes
- singletons and private constructors
*/

abstract class Department {
    // private name: string;
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.name = name;
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    // describe(this: Department) {
    //     console.log(`Department (${this.id}): ${this.name}`);
    // }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    // admins: string[];
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
        // this.admins = admins;
    }

    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.'); // null
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }

    // singleton
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', [])
        return this.instance;
    }

    describe() {
        console.log('Account department - ID: ' + this.id);
    }

    addEmployee(name: string) {
        if (name === 'Marcus'){
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

// using static method
const employee1 = Department.createEmployee('Marcus');
console.log(employee1);

const it = new ITDepartment('d1', ['Marcus']);
it.addEmployee('Marcus');
it.addEmployee('Jack');
it.describe();
it.printEmployeeInformation();
console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = 'Year End Report'; // setter
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);
accounting.addEmployee('Marcus'); // should not work
accounting.addEmployee('Chris'); // should work
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();
console.log(accounting);