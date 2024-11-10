import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/api/tasks'; // Replace with your backend endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get the authorization headers

  // Fetch tasks with authorization headers
  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  // Delete task with authorization headers
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<any>(url, { withCredentials: true });
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`, {
      withCredentials: true,
    });
  }

  // Add other task-related methods here (e.g., createTask, updateTask)
  addTask(task: any) {
    return this.http.post(this.apiUrl, task, { withCredentials: true });
  }

  editTask(task: any, taskId: string) {
    return this.http.put(`${this.apiUrl}/${taskId}`, task, {
      withCredentials: true,
    });
  }
}
