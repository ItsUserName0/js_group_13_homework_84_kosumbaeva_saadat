import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'tasks/new', component: EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
