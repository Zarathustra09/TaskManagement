import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-complete',
  templateUrl: './task-complete.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    DatePipe
  ],
  styleUrls: ['./task-complete.component.css'],
  providers: [DatePipe]
})
export class TaskCompleteComponent implements OnInit {
  tasksCompleted: any[] = [];

  constructor(private taskService: TaskService,
              private datePipe: DatePipe,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getTasksCompleted();
  }

  getTasksCompleted(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        // Filter tasks with status 'completed'
        this.tasksCompleted = tasks.filter(task => task.status === 'completed');
      }, error => {
        console.error('Error fetching completed tasks:', error);
      });
  }
  navigateToUpdate(id: number): void {
    this.router.navigate(['/update-task', id]);
  }
  // Utility function to format date
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM, yyyy') || '';
  }
}
