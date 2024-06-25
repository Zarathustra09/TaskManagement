import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskId: number;
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskForm = this.formBuilder.group({
      id: [this.taskId], // Include id field in the form
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      due_Date: ['']
    });
  }

  ngOnInit(): void {
    this.getTaskDetails();
  }

  getTaskDetails(): void {
    this.taskService.getTask(this.taskId)
      .subscribe((task: Task) => {
        // Manually setting values to ensure correct population
        this.taskForm.patchValue({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          due_Date: task.due_Date ? new Date(task.due_Date).toISOString().substring(0, 10) : ''
        });
      }, error => {
        console.error('Error fetching task details:', error);
        // Handle error (e.g., show error message)
      });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value)
        .subscribe(() => {
          console.log('Task updated successfully');
          this.router.navigate(['/dashboard']); // Navigate to task list after update
        }, error => {
          console.error('Error updating task:', error);
          // Handle error (e.g., show error message)
        });
    } else {
      console.error('Form is invalid');
      // Optionally, display validation error messages
    }
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.taskId)
        .subscribe(() => {
          console.log('Task deleted successfully');
          this.router.navigate(['/dashboard']); // Navigate to task list after deletion
        }, error => {
          console.error('Error deleting task:', error);
          // Handle error (e.g., show error message)
        });
    }
  }
}
