import { Component } from '@angular/core';
import {TaskProgressComponent} from "../task-progress/task-progress.component";
import {TaskListComponent} from "../task-list/task-list.component";
import {TaskCompleteComponent} from "../task-complete/task-complete.component";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskProgressComponent, TaskListComponent, TaskCompleteComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    constructor(
      private router: Router

    ) {
    }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
}
