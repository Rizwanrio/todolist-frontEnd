import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  taskId: string | null = null;
  task: Task | null = null; // To hold the fetched task data
  editTaskForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService, // Inject your task service
    private router: Router
  ) {
    this.editTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    // Retrieve the task ID from the route parameters
    this.taskId = String(this.route.snapshot.paramMap.get('id')!);
    this.loadTaskDetails();
  }

  loadTaskDetails(): void {
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (data) => {
          this.task = data;
          this.editTaskForm.patchValue({
            title: this.task.title,
            description: this.task.description,
            dueDate: this.task.dueDate,
            priority: this.task.priority.toLowerCase(),
            status: this.task.status,
          });
        },
        error: (err) => {
          console.error('Error fetching task:', err);
        },
      });
    }
  }

  onEditTask() {
    if (this.editTaskForm.valid && this.taskId) {
      // Process the task
      this.taskService
        .editTask(this.editTaskForm.value, this.taskId)
        .subscribe(() => {
          this.router.navigate(['/tasks']); // Navigate back to task list
        });
      console.log('Task submitted:', this.editTaskForm.value);
    }
  }

  onClear() {
    this.editTaskForm.reset();
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
