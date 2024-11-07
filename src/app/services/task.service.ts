import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; // Replace with your backend endpoint

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

  // Add other task-related methods here (e.g., createTask, updateTask)
  addTask(task: any) {
    return this.http.post(this.apiUrl, task, { withCredentials: true });
  }
}
