import { Injectable } from '@angular/core';
import { Task } from './model/task';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

let Tasks: Task[] = [
];
@Injectable({
  providedIn: 'root',
})
export class TaskService{
  fillTask(e:any) {
    Tasks = [];
    e.forEach((value: any) => {
        const item = {
            idTask : value.idTask,
            description: value.description,
            done: value.done,
            fromDate: value.from_date,
            toDate: value.to_date
        }
        Tasks.unshift(item);
      });
  };
  
  getTasks(): Observable<Task[]> {
    return of(Tasks).pipe(delay(500));
  }

  getTaskByDescription(idTask: string): Observable<Task> {
    let task = Tasks.find((x) => x.idTask == idTask)
        return of(task as Task).pipe(delay(500));
  }
}
