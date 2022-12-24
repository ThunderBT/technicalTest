import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskManageComponent } from './components/task-manage/task-manage.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskDetailsResolver } from './resolvers/task-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
  },
  {
    path: 'details/:id',
    component: TaskDetailsComponent,
    resolve: {
      task: TaskDetailsResolver,
    },
  },
  {
    path: 'edit/:id',
    component: TaskManageComponent,
    resolve: {
      task: TaskDetailsResolver,
    },
  },
  {
    path: 'create',
    component: TaskManageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TaskDetailsResolver],
})
export class TasksRoutingModule {
}
