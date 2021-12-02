import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkToDate } from './fromToDateValidator';
import { checkFromDate } from './checkFromDateValidator';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [DatePipe]
})
export class TodoComponent implements OnInit {
  public all: any;
  Items: any;
  finish: number = 0;
  myDate: any = new Date();
  from: any;
  to: any;
  taskDetail= new FormGroup({});



  count() {
    this.finish=0;
    this.Items.map((x: { done: boolean; }) => {
      if(x.done == true) {
        this.finish++;
      }
    })
  }

  begin() {
    if (localStorage.getItem("AllJob")) {
      this.all= localStorage.getItem("AllJob");
      this.Items= JSON.parse(this.all);
    } else {
      this.Items = [];
      localStorage.setItem("AllJob", this.Items);
    }
    this.count();
  }

  pattern="^[a-zA-Z]+$";
  constructor(
    private datapipe: DatePipe, private fb: FormBuilder, private api: TaskService) 
    {
    this.myDate = this.datapipe.transform(this.myDate,'MM') ;
  }

  tasks$: Observable<Task[]> | any;

  get f() {
    return this.taskDetail.controls;
  }

  ngOnInit() {
    this.begin();
    this.taskDetail = this.fb.group({
      job: ['', [Validators.required, Validators.pattern(this.pattern)]],
      from: ['', [Validators.required, checkFromDate]],
      to: ['', Validators.required]
    },
    {
      validator: checkToDate('from', 'to'),
    });
    this.tasks$ = this.api.getTasks();
    this.api.fillTask(this.Items);
  }

  addTask() {
    var newJob = {
      description: this.taskDetail.controls.job.value, done: false, from_date: this.taskDetail.controls.from.value, to_date: this.taskDetail.controls.to.value
    }
    this.Items.unshift(newJob);
    // this.Items = [newJob]; đề phòng trường hợp xóa hết dữ liệu ở local
    localStorage.setItem("AllJob", JSON.stringify(this.Items));
    this.count();
    this.taskDetail.setValue ({
      job: '',
      from: '',
      to: ''
    });
    this.taskDetail.reset(this.taskDetail.value);
    this.api.fillTask(this.Items);
  }

  changeStt(e: any) {
    localStorage.setItem("AllJob", JSON.stringify(this.Items)); 
    this.count();
    this.api.fillTask(this.Items);
  }

  achive(e:any) {
    var i = e.length;
    while (i--) {
      e.forEach((index: any, number: any) => {
        if (index.done == true) {
          e.splice(number, 1);
        }
      });
      localStorage.setItem("AllJob", JSON.stringify(this.Items));
    }
    this.count();
    this.api.fillTask(this.Items);
  }
}
