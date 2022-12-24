import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskManageComponent } from './components/task-manage/task-manage.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksStoreService } from './services/tasks-store.service';
import { TasksApiModule } from '../../tasks-api/tasks-api.module';


@NgModule({
  declarations: [
    TasksListComponent,
    TaskDetailsComponent,
    TaskManageComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TasksApiModule,
  ],
  providers: [
    TasksStoreService,
  ],
})
export class TasksModule { }
