import { Injectable } from '@angular/core';
import { User } from '../entities/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:7160/api';

  constructor(private http: HttpClient) { }
  loginUser(person: Partial<User>): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/login`, person)
  }

  addUser(person: Partial<User>): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/register`, person);
  }
}
