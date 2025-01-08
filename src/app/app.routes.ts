import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { RegisterComponent } from './register/register.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { AuthGuard } from './auth.guard';
//import { authguard } from './auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  {
    path: 'add-task',
    component: AddTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks/edit/:id',
    component: TaskEditComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
];
