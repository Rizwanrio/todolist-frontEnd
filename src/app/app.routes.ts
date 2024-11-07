import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { RegisterComponent } from './register/register.component';
//import { AuthGuard } from './auth.guard';
//import { authguard } from './auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent /*canActivate: [authguard] */ },
  {
    path: 'add-task',
    component: AddTaskComponent /*canActivate: [authguard]*/,
  },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
];
