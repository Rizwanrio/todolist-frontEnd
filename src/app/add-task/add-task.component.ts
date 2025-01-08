import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  taskForm: FormGroup;
  minDate: string;
  private fb = inject(FormBuilder); // Use Angular's inject function to get FormBuilder

  constructor(private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Low', Validators.required],
      category: ['Work', Validators.required],
      status: ['Pending', Validators.required],
    });
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  // Method to handle task submission
  onSubmit() {
    if (this.taskForm.valid) {
      // Process the task
      this.taskService.addTask(this.taskForm.value).subscribe(() => {
        this.router.navigate(['/tasks']); // Navigate back to task list
      });

      this.taskForm.reset();
    }
  }

  // Method to get control for easy access in the template
  getControl(controlName: string) {
    return this.taskForm.get(controlName);
  }

  // Method to reset the form on cancel
  onCancel() {
    this.taskForm.reset();
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
