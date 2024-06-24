import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    DatePipe
  ],
  styleUrls: ['./task-progress.component.css'],
  providers: [DatePipe]
})
export class TaskProgressComponent implements OnInit {
  tasksInProgress: any[] = [];

  constructor(private taskService: TaskService, private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.getTasksInProgress();
  }

  navigateToUpdate(id: number): void {
    this.router.navigate(['/update-task', id]);
  }

  getTasksInProgress(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        // Filter tasks with status 'in_progress'
        this.tasksInProgress = tasks.filter(task => task.status === 'in_progress');
      }, error => {
        console.error('Error fetching tasks in progress:', error);
      });
  }

  // Utility function to format date
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM, yyyy') || '';
  }
}
