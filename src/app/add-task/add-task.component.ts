import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  taskForm: FormGroup;
  private fb = inject(FormBuilder); // Use Angular's inject function to get FormBuilder

  constructor(private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: [''],
    });
  }

  // Method to handle task submission
  onSubmit() {
    if (this.taskForm.valid) {
      // Process the task
      this.taskService.addTask(this.taskForm.value).subscribe(() => {
        this.router.navigate(['/tasks']); // Navigate back to task list
      });
      console.log('Task submitted:', this.taskForm.value);
      this.taskForm.reset();
    }
  }

  // Method to reset the form on cancel
  onCancel() {
    this.taskForm.reset();
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
