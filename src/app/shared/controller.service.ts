import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Qod } from './model';
import { Weather } from './model';
import { Address } from './model';
import { TodoItem } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  quoteAPIURL = 'https://quotes.rest/qod.json';
  weatherAPIURL = 'https://corsproxysomik.herokuapp.com/https://api.darksky.net/forecast/44d5f2c1fe93d1fe500407f32b6fe528/';
  locationAPIURL = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&';
  todos: TodoItem[];
  todoTitle: string;
  todoId: number;
  beforeEditCache: string;
  filter: string;
  public isEmpty: boolean;

  constructor(private http: HttpClient) {
    this.filter = 'all';
    this.todoTitle = '';
    this.beforeEditCache = '';
    this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    if (this.todos.length === 0) {
      this.isEmpty = true;
    }
    this.todoId = this.todos.length > 0 ? (this.todos[(this.todos.length) - 1].id) + 1 : 1;
  }
  getUserName(): String {
    return localStorage.getItem('name') ? localStorage.getItem('name') : 'User';
  }

  updateName(event: any) {
    localStorage.setItem('name', event.target.innerText);
    event.target.blur();
  }

  getGreeting(): String {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 12)
      return 'Good Morning, ';
    else if (hour < 17)
      return 'Good Afternoon, ';
    else if (hour < 21)
      return 'Good Evening, ';
    else
      return 'Good Night, ';
  }

  getQuote(): Observable<Qod> {
    return this.http.get<Qod>(this.quoteAPIURL);
  }

  getWeather(location: string): Observable<Weather> {
    return this.http.get<Weather>(`${this.weatherAPIURL}${location}?exclude=minutely,hourly,daily`);
  }

  getLocation(lat: number, lng: number): Observable<Address> {
    return this.http.get<Address>(`${this.locationAPIURL}lat=${lat}&lon=${lng}`);
  }

  addTodo(todoTitle: string): void {

    this.todos.push({
      id: this.todoId,
      title: todoTitle,
      completed: false,
      editing: false
    });
    this.todoId++;
    this.todosUpdated();
  }
  deleteTodo(id: number): void {
    // this.todos.splice(id - 1, 1); found it was being computationally expensive
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosUpdated();
  }
  editTodo(todo: TodoItem): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
    this.todosUpdated();
  }
  doneEdit(todo: TodoItem): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
    this.todosUpdated();
  }
  cancelEdit(todo: TodoItem): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }
  toggleCompleteItem(todo: TodoItem, e: any): void {
    todo.completed = !todo.completed;
    e.currentTarget.blur();
    this.todosUpdated();
  }
  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }
  removeCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todosUpdated();
  }
  filterTodos(): TodoItem[] {
    if (this.filter === 'all') {
      return this.sortTodo(this.todos);
    }
    else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }
    else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
  sortTodo(todo: TodoItem[]): TodoItem[] {
    return todo.sort(function (a: any, b: any) { return a.completed - b.completed });
  }
  todosUpdated(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.isEmpty = false;
  }

}
