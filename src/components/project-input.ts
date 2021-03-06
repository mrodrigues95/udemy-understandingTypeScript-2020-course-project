import { Component } from './base-component';
import * as Validation from '../util/validation';
import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
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
  }

  // Validate user input.
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const typeValidtable: Validation.Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidtable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    const peopleValidtable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    // Validate the user input.
    if (
      // When at least one of these return false, throw an alert.
      !Validation.validate(typeValidtable) ||
      !Validation.validate(descriptionValidtable) ||
      !Validation.validate(peopleValidtable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      // User input is valid, continue.
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

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
}
