// src/app/models/task.model.ts
export interface Task {
  id: string; // Assuming ID is a string
  title: string;
  description: string;
  dueDate: Date; // You can adjust this based on how you want to handle dates
  priority: string; // e.g., 'High', 'Medium', 'Low'
  category: string; // Optional
  completed: boolean; // Track if the task is completed
}
