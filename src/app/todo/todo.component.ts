import { Component, OnInit } from '@angular/core';

import { TodoItem } from '../shared/model';
import { ControllerService } from '../shared/controller.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private todos: TodoItem[];
  private todoTitle: string;
  private todoId: number = 3;
  private beforeEditCache: string;
  private filter: string = 'all';
  constructor(private controller: ControllerService) { }

  ngOnInit() {
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'Get groceries',
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: 'Hit the gym',
        completed: false,
        editing: false
      }
    ];

  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: this.todoId,
      title: this.todoTitle,
      completed: false,
      editing: false
    });
    this.todoTitle = '';
    this.todoId++;
  }
  deleteTodo(id: number): void {
    // this.todos.splice(id - 1, 1); found it was being computationally expensive
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
  editTodo(todo: TodoItem): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  doneEdit(todo: TodoItem): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }
  cancelEdit(todo: TodoItem): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }
  toggleCompleteItem(todo: TodoItem): void {
    todo.completed = !todo.completed;
  }
  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }
  removeCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  filterTodos(): TodoItem[] {
    if (this.filter === 'all') {
      return this.todos;
    }
    else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }
    else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

}
