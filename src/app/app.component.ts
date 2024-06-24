import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {TaskService} from "./services/task.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService,TaskService]
})
export class AppComponent {
  title = 'TaskManagement';
}
