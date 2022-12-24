import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TasksApiService } from '../../../tasks-api/services/tasks-api.service';
import { Task } from '../../../tasks-api/interfaces/task.interface';

@Injectable()
export class TasksStoreService {
  public get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  public set onlyDone(val: boolean) {
    this._onlyDone = val;
  }

  public set selectedCategory(val: string) {
    this._selectedCategory = val;
  }

  private readonly _tasks$ = new BehaviorSubject<Task[]>([]);

  private _onlyDone: boolean;
  private _selectedCategory: string;

  constructor(
    private tasksApi: TasksApiService,
  ) { }

  public sendGetTasks(): void {
    this.tasksApi.getTasks().subscribe(
      (tasks: Task[]) => {
        let res = this.filtrateTasks(tasks, this._selectedCategory, this._onlyDone);

        this._tasks$.next(res);
      }
    );
  }

  public filtrateTasks(tasks: Task[], selectedCategory: string, onlyDone: boolean): Task[] {
    let res = tasks;

    if (selectedCategory) {
      res = this.filterByCategory(res, this._selectedCategory);
    }

    if (onlyDone) {
      res = this.filterByDone(res, this._onlyDone);
    }

    return res;
  }

  public filterByCategory(tasks: Task[], selectedCategory: string): Task[] {
    if (!tasks || !selectedCategory) {
      return tasks;
    }

    return tasks.filter((task) => task.category === selectedCategory);
  }

  public filterByDone(tasks: Task[], onlyDone: boolean): Task[] {
    if (!tasks) {
      return tasks;
    }

    return tasks.filter((task) => !!task.done === onlyDone);
  }
}
