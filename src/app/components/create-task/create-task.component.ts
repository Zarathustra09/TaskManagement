import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending'],
      priority: ['medium'],
      due_Date: ['']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        priority: this.taskForm.value.priority,
        due_Date: this.taskForm.value.due_Date || null,
        created_At: new Date(),
        updated_At: new Date()
      };

      this.taskService.addTask(newTask).subscribe(
        () => {
          console.log('Task created successfully');
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error creating task:', error);
          // Handle error (e.g., show error message)
        }
      );
    } else {
      console.error('Form is invalid');
      // Optionally, display validation error messages
    }
  }
}
