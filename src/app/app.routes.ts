import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskProgressComponent} from "./components/task-progress/task-progress.component";
import {TaskCompleteComponent} from "./components/task-complete/task-complete.component";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
import {UpdateTaskComponent} from "./components/update-task/update-task.component";

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'task-list', component: TaskListComponent},
  {path: 'task-progress', component: TaskProgressComponent},
  {path: 'task-complete', component: TaskCompleteComponent},
  {path: 'create-task', component: CreateTaskComponent},
  {path: 'update-task/:id', component: UpdateTaskComponent},


];
