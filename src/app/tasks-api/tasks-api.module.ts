import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksApiService } from './services/tasks-api.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TasksApiService,
  ]
})
export class TasksApiModule { }
