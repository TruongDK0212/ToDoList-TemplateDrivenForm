import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public all: any;
  Items: any;
  finish: number = 0;

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

  constructor() { }

  ngOnInit(): void {
    this.begin();
  }

  addTask(e: any) {
    var newJob = {
      description: e.controls.job.value, done: false, from_date: e.controls.from.value, to_date: e.controls.to.value
    }
    this.Items.unshift(newJob);
    // this.Items = [newJob]; đề phòng trường hợp xóa hết dữ liệu ở local
    localStorage.setItem("AllJob", JSON.stringify(this.Items));
    this.count();
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
      console.log(this.Items);
      localStorage.setItem("AllJob", JSON.stringify(this.Items));
    }
    this.count();
  }
}
