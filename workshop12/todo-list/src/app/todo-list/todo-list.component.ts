import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  name:string="";
todos:string[]=[];

saveToDo(){
  let isContain=this.isContain();

  if(!isContain){
    this.todos.push(this.name);
    console.log(this.todos);
    this.name='';
  } else{
    alert('todo mevcut: '+`${this.name}`);
    this.name='';
  }
}

isContain(){
  return this.todos.some((todo)=>todo===this.name);
}

deleteTodo(todo:string){
console.log('delete: '+todo);
this.todos=this.todos.filter((arrTodo) => arrTodo!= todo);
console.log(this.todos.filter((arrTodo) =>arrTodo != todo));
}

}
