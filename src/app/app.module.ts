import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { ChangeDatePipe } from './allPipe/change-date.pipe';
import { toDatePipe } from './allPipe/to-date.pipe';
import { checkOutOfDate } from './allPipe/checkOutOfDate.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskDetailComponent,
    ChangeDatePipe,
    toDatePipe,
    checkOutOfDate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
