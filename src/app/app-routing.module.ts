import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: "todolist/task/:idTask",
    component: TaskDetailComponent,
  },
  {
    path: "todolist",
    component: TodoComponent,
  },
  {
    path: "",
    redirectTo: "todolist",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
