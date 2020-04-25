// Drag and drop interface.
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    // This signals that anything your dragging over it
    // is a valid drag over target.
    dragOverHandler(event: DragEvent): void;
    // Reacts to the actual drop that happens.
    dropHandler(event: DragEvent): void;
    // Provides visual feedback to the user.
    dragLeaveHandler(event: DragEvent): void;
  }
}