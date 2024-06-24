import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7284/api/Task'; // Replace with your API endpoint
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` // Retrieve token from local storage
    })
  };

  constructor(private http: HttpClient) { }

  // GET: /api/Task
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions);
  }

  // GET: /api/Task/{id}
  getTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  // POST: /api/Task
  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, this.httpOptions);
  }

  // PUT: /api/Task/{id}
  updateTask(id: number, task: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, task, this.httpOptions);
  }

  // DELETE: /api/Task/{id}
  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }
}
