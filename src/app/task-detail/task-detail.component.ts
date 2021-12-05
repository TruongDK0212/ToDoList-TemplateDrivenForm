import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { TaskService } from '../task.service';
import { ChangeDatePipe } from '../allPipe/change-date.pipe';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})

export class TaskDetailComponent implements OnInit {

  task$: Observable<Task> | undefined;
  constructor(private _route: ActivatedRoute, private _api: TaskService) {}

  ngOnInit(): void {
    let idTask = this._route.snapshot.paramMap.get('idTask');
    this.task$ = this._api.getTaskByDescription(idTask as string);


    // this._route.paramMap.subscribe(params => {
    //   const idTask = params.get('idTask');
    //   console.log(idTask);
    //   this.task$ = this._api.getTaskByDescription(idTask as string);
    // });
  }

}
