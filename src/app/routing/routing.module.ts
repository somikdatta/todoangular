import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AutofocusModule } from 'angular-autofocus-fix';

import { HomeComponent } from '../home/home.component';
import { TodoComponent } from '../todo/todo.component';
import { ThewallComponent } from '../thewall/thewall.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'thewall', component: ThewallComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/thewall', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    HomeComponent,
    TodoComponent,
    ThewallComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
    FormsModule,
    AutofocusModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
