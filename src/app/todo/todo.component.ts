import { Component, OnInit } from '@angular/core';

import { ControllerService } from '../shared/controller.service';
import { TodoItem } from '../shared/model'
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    trigger('fade', [
      transition(":enter", [
        style({ opacity: 0, transform: 'translateX(-3rem)' }),
        animate(200, style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate(200, style({ opacity: 0, transform: 'translateX(2rem)' }))
      ])
    ]),
    trigger('pop', [
      transition(":enter", [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(200, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(200, style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  todoTitle: string;
  controller: ControllerService;
  constructor(private service: ControllerService) {
    this.controller = service;
  }

  ngOnInit() {
    this.todoTitle = '';
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.controller.addTodo(this.todoTitle);
    this.todoTitle = '';
  }
  deleteTodo(id: number): void {
    // this.todos.splice(id - 1, 1); found it was being computationally expensive
    this.controller.deleteTodo(id);
  }
  editTodo(todo: TodoItem): void {
    this.controller.editTodo(todo);
  }
  doneEdit(todo: TodoItem): void {
    this.controller.doneEdit(todo);
  }
  cancelEdit(todo: TodoItem): void {
    this.controller.cancelEdit(todo);
  }
  toggleCompleteItem(todo: TodoItem): void {
    this.controller.toggleCompleteItem(todo);
  }
  removeCompleted(): void {
    this.controller.removeCompleted();
  }



}
