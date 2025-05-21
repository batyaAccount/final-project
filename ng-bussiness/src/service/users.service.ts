import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://final-project-x2ln.onrender.com/api/User';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  private url = 'https://final-project-x2ln.onrender.com/api/Auth';


  addUser(user: Partial<User>): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    debugger
    return this.http.post('https://final-project-x2ln.onrender.com/api/Auth/register', {
      name: user.name,
      password: user.password,
      email: user.email,
      roleName: user.roleName,
      accountantId: user.accountantId
  },{headers});

  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
