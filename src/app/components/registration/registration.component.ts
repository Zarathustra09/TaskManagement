import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Register } from "../../model/register.class";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink
  ],
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerDto: Register = {
    username: '',
    password: '',
    confirmPassword: ''
  };
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(private authService: AuthService, private router: Router) { }

  hideShowPass() {
    this.isText = !this.isText;
    if (this.isText) {
      this.type = 'text';
      this.eyeIcon = 'fa-eye';
    } else {
      this.type = 'password';
      this.eyeIcon = 'fa-eye-slash';
    }
  }

  register(): void {
    this.authService.register(this.registerDto).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      },
      error => {
        console.error('Error registering user', error);
        // Handle registration error (e.g., show error message)
      }
    );
  }
}
