import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgOptimizedImage
  ],
  styleUrls: ['./task-list.component.css'],
  providers: [DatePipe]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService,
              private datePipe: DatePipe,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  navigateToUpdate(id: number): void {
    this.router.navigate(['/update-task', id]);
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        // Filter tasks with status 'pending'
        this.tasks = tasks.filter(task => task.status === 'pending');
      }, error => {
        console.error('Error fetching tasks:', error);
      });
  }

  // Utility function to format date
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM, yyyy') || '';
  }
}
