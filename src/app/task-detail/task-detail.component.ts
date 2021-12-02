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
    let description = this._route.snapshot.paramMap.get('description');
    this.task$ = this._api.getTaskByDescription(description as string);
  }

}
