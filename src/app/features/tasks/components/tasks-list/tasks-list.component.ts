import { TasksApiService } from './../../../../tasks-api/services/tasks-api.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../../tasks-api/interfaces/task.interface';
import { Router } from '@angular/router';
import { TasksStoreService } from '../../services/tasks-store.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {
  public tasksList: Task[];

  public onlyDone = new FormControl(false);
  public category = new FormControl('');

  public readonly tasks$: Observable<Task[]>;

  protected readonly destroyed$ = new Subject<void>();

  constructor(
    private tasksApi: TasksApiService,
    private router: Router,
    private tasksStore: TasksStoreService,
  ) {
    this.tasks$ = this.tasksStore.tasks$;
  }

  ngOnInit(): void {
    this.tasks$.pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.tasksList = res;
      });
    this.tasksStore.sendGetTasks();
  }

  public ngAfterViewInit(): void {
    this.onlyDone.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tasksStore.onlyDone = value;
        this.tasksStore.sendGetTasks();
      });

    this.category.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.tasksStore.selectedCategory = value;
        this.tasksStore.sendGetTasks();
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onTaskDetails(id: number): void {
    this.router.navigateByUrl(`/details/${id}`);
  }

  public onTaskCreate(): void {
    this.router.navigateByUrl(`/create`);
  }
}
