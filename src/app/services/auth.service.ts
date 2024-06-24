import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Register} from "../model/register.class";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7284/api/Authentication';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(registerDto: Register): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerDto);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Navigate the user to the login page or home page
    this.router.navigate(['/login']);
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
