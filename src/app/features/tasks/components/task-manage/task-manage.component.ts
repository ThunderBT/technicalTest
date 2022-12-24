import { Task } from '../../../../tasks-api/interfaces/task.interface';
import { TasksApiService } from './../../../../tasks-api/services/tasks-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-manage',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.scss']
})
export class TaskManageComponent implements OnInit {
  public readonly taskForm = new FormGroup({
    label: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  });

  public task: Task;

  public isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private tasksApi: TasksApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.task = this.route.snapshot.data.task;

    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  public onSubmit(): void {
    let apiCall: Observable<Task>;

    if (this.task) {
      apiCall = this.tasksApi.updateTask(this.task.id, this.taskForm.value);
    } else {
      apiCall = this.tasksApi.createTask({ done: false, ...this.taskForm.value });
    }

    apiCall.subscribe(() => this.router.navigateByUrl(``))
  }
}
