// Project state management.
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {

  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  // Add a new project.
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople
    };
    this.projects.push(newProject);
    // Call all listener functions.
    for (const listenerFn of this.listeners) {
      // Listener reference.
      // Return a copy of the array and not the original.
      listenerFn(this.projects.slice());
    }
  }
}
const projectState = ProjectState.getInstance();

// Validation.
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  // Input is required.
  if (validatableInput.required) {
    // Return false if the value is 0, otherwise return true.
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // The string should have a minimum length.
  // Also, skip this check if the input is a number.
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  // The string should have a maximum length.
  // Also, skip this check if the input is a number.
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  // The number should have a minimum value.
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  // The number should have a maximum value.
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// Autobind decorator.
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class ProjectList {
  templateElement: HTMLTemplateElement; // template
  hostElement: HTMLDivElement; // div
  element: HTMLElement; // section
  assignedProjects: any[];
  
  constructor(private type: 'active' | 'finished') {
    // Retrieve template elements.
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    // Template content.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Store the section element.
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    // Register a listener function.
    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }

  // Render all projects to the DOM.
  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }
  }

  private renderContent() {
    // Get the unordered list and assign an id.
    // Also, fill the h2 with some content.
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
  }

  // Render an element.
  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement; // template
  hostElement: HTMLDivElement; // div
  element: HTMLFormElement; // form
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // Retrieve form elements.
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // Template content.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Store the form element.
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    // Get access to the form elements.
    this.titleInputElement = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // Validate user input.
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const typeValidtable: Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidtable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    const peopleValidtable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    // Validate the user input.
    if (
      // When at least one of these return false, throw an alert.
      !validate(typeValidtable) ||
      !validate(descriptionValidtable) ||
      !validate(peopleValidtable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      // User input is valid, continue.
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // Clear form inputs.
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault(); // disable HTTP request
    const userInput = this.gatherUserInput();
    // Check if is array.
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  // Render an element (in this case, the form) to the div.
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
