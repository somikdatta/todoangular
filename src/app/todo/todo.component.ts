import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private todos: object[];
  constructor() { }

  ngOnInit() {
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
    ]

  }

}
