

// Component base class
// Performs all of the general rendering/attaching of the component.
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T; // the place where we want to render an item
  element: U; // the element we do render

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // Select different elements.
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    // Template content.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Store the element.
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  // Attach an element.
  private attach(insertAtBeginning: boolean) {
    // Insert 'afterbegin' if true, otherwise insert 'beforeend'.
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
