// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model'; // Import the Task model
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; // Import TaskService
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-task-list',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule], // Import necessary Angular modules
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      },
    });
  }

  // Add methods for add, edit, and delete tasks as needed

  // Inside task-list.component.ts
  editTask(taskId: string) {
    // Logic to navigate to the edit task component
  }

  deleteTask(taskId: string) {
    // Logic to call the delete method from TaskService
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        // Remove the deleted task from the tasks array in the UI
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      error: (error) => {
        console.error('Failed to delete task:', error);
      },
    });
  }

  navigateToAddTask() {
    this.router.navigate(['/add-task']);
  }

  logout() {
    this.authService.logout();
  }
}
