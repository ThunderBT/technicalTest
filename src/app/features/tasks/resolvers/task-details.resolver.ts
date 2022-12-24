import { TasksApiService } from './../../../tasks-api/services/tasks-api.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from '../../../tasks-api/interfaces/task.interface';

@Injectable()
export class TaskDetailsResolver implements Resolve<Task> {

  constructor(private router: Router,
    private tasksApi: TasksApiService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Task> {
    const { id } = route.params;
    return this.tasksApi.getTask(id)
      .pipe(
        map((result: Task) => result)
      )
      .pipe(catchError(err => {
        this.router.navigateByUrl('/');
        return EMPTY;
      }));
  }
}
