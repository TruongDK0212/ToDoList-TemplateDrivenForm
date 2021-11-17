import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkToDate } from './fromToDateValidator';
import { checkFromDate } from './checkFromDateValidator';

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
  constructor(private datapipe: DatePipe, private fb: FormBuilder) {
    this.myDate = this.datapipe.transform(this.myDate,'MM') ;
  }

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
  }

  changeStt(e: any) {
    localStorage.setItem("AllJob", JSON.stringify(this.Items)); 
    this.count();
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
  }
}
