import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoCartComponent } from '../todo-cart/todo-cart.component';
import { GetToDoListResponse } from '../models/GetToDoListResponse';
import { CreateToDoRequest } from '../models/CreateToDoRequest';
import { CreateToDoResponse } from '../models/CreateToDoResponse';
import { UpdateTodoRequest } from '../models/UpdateToDoRequest';
import { UpdateTodoResponse } from '../models/UpdateTodoResponse';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, TodoCartComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  name: string = '';
  todos: string[] = [];
  toDoListFromBackend: GetToDoListResponse[] = [];

  /**
   *
   */
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  saveToDo() {
    let isContain = this.isContain();

    if (!isContain) {
      this.todos.push(this.name);
      console.log(this.todos);
      this.name = '';
    } else {
      alert('todo mevcut: ' + `${this.name}`);
      this.name = '';
    }
  }

  isContain() {
    return this.todos.some((todo) => todo === this.name);
  }

  deleteTodo(todo: string) {
    this.todos = this.todos.filter((arrTodo) => arrTodo !== todo);
  }

  fetchTodos() {
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = response;
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
  }

  addTodo() {
    const newTodo: CreateToDoRequest = {
      userId: 1,
      title: 'New Todo',
      completed: false,
    };
    this.httpClient
      .post<CreateToDoResponse>(
        'https://jsonplaceholder.typicode.com/todos',
        newTodo
      )
      .subscribe({
        next: (response: CreateToDoResponse) => {
          console.log('Add Response: ', response);
          this.toDoListFromBackend.push(response);
        },
        error: (err: any) => {
          alert(`hata: ${err}`);
        },
        complete: () => {
          console.log('POST işlemi sonlandı.');
        },
      });
  }

  updateTodo(todo: UpdateTodoRequest) {
    const updateTodo: UpdateTodoRequest = {
      ...todo,
      title: 'Updated Title',
    };

    this.httpClient
      .put<UpdateTodoResponse>(
        `https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`,
        updateTodo
      )
      .subscribe({
        next: (response: UpdateTodoResponse) => {
          console.log('Add Response: ', response);
          // this.todoListFromBackend.push(response);
          const index = this.toDoListFromBackend.findIndex(
            (t) => t.id === todo.id
          );
          if (index !== -1) {
            this.toDoListFromBackend[index] = response;
          }
        },
        error: (err: any) => {
          alert(`hata: ${err}`);
        },
        complete: () => {
          console.log('POST işlemi sonlandı.');
        },
      });
  }

  deleteTodoWithId(todoId: number) {
    this.httpClient
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .subscribe({
        next: () => {
          console.log(`Todo silme başarılı.`);
          this.toDoListFromBackend = this.toDoListFromBackend.filter(
            (t) => t.id !== todoId
          );
        },
        error: (err) => {
          console.error(`Error deleting todo: ${err}`);
        },
        complete: () => {
          console.log('DELETE işlemi sonlandı.');
        },
      });
  }

  getById() {
    this.httpClient
      .get<GetToDoListResponse[]>(
        `https://jsonplaceholder.typicode.com/todos/${this.name}`
      )
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          alert(JSON.stringify(response, null, 2));
          // console.log(response);
        },
        error: (err: any) => {
          console.log('hata: ', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
  }
}
