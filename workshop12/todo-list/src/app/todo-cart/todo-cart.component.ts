import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-cart',
  standalone: true,
  imports: [],
  templateUrl: './todo-cart.component.html',
  styleUrl: './todo-cart.component.scss',
})
export class TodoCartComponent {
  @Input() toDoFromOtherPage: string = '';
  @Output() onRemoveClick: EventEmitter<string> = new EventEmitter<string>();

  onRemove() {
    this.onRemoveClick.emit(this.toDoFromOtherPage);
  }
}
