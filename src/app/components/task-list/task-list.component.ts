// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model'; // Import the Task model
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; // Import TaskService
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-task-list',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule], // Import necessary Angular modules
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  notifications: string[] = [];
  isDropdownOpen = false;
  ovderDueTasks: Task[] = [];
  // Replace ELEMENT_DATA with your actual data array
  paginatedData: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService // private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    // this.updatePaginatedData();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.totalItems = this.tasks.length;
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.paginatedData = this.tasks.slice(startIndex, endIndex);
        /*
        //notification logic
        this.notificationService
          .listenForOverdueTasks()
          .subscribe((message: string) => {
            this.notifications.push(message);
          });*/
        this.notify();
        console.log(this.ovderDueTasks);
        console.log(this.notifications);
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      },
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //notification logic

  notify(): void {
    this.ovderDueTasks = this.tasks.filter((el) => el.status === 'Overdue');
    this.notifications = this.ovderDueTasks.map(
      (el) => `Task ${el.title} is Overdue`
    );
  }

  // Pagination functions

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.tasks.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  // Calculate the total number of pages using Math.ceil
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Add methods for add, edit, and delete tasks as needed

  // Inside task-list.component.ts
  editTask(taskId: string): void {
    {
      // Logic to navigate to the edit task component
      this.router.navigate([`/tasks/edit`, taskId]);
    }
  }

  deleteTask(taskId: string) {
    // Logic to call the delete method from TaskService
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        // Remove the deleted task from the tasks array in the UI
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.fetchTasks();
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

  //
  //

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  // Select a specific page
  selectPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  // Calculate the total number of pages

  // Helper function to create an array of page numbers for the pagination links
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
