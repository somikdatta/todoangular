import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

import { SkyconsModule } from 'ngx-skycons';

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
    SkyconsModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
