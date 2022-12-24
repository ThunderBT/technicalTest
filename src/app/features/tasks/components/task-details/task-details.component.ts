import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksApiService } from '../../../../tasks-api/services/tasks-api.service';
import { Task } from '../../../../tasks-api/interfaces/task.interface';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public task: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksApi: TasksApiService,
  ) { }

  ngOnInit(): void {
    this.task = this.route.snapshot.data.task;
  }

  public onTaskEdit(): void {
    this.router.navigateByUrl(`/edit/${this.task.id}`);
  }

  public onTaskDelete(): void {
    this.tasksApi.deleteTask(this.task.id).subscribe(() => {
      this.router.navigateByUrl(``);
    });
  }

  public markTaskAsDone(): void {
    const date = new Date();
    const done = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    this.tasksApi.updateTask(this.task.id, { done }).subscribe(() => {
      this.task.done = done;
    });
  }
}
