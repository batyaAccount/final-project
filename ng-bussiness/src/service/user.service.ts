import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly user: BehaviorSubject<Partial<User>> = new BehaviorSubject<Partial<User>>(
    this.getUserFromSessionStorage()
  );
  user$ = this.user.asObservable();
  constructor(private http: HttpClient) {
  }
  private getHeaders(): HttpHeaders {
    let token = '';
    if (this.user$.subscribe(
      (user: Partial<User>) => {
        if (user && user.token) {
          token = user.token;
        }
      }
    )) { }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getTeacerById(id: string|undefined): Observable<Partial<User>> {
    if(id == undefined) 
      alert("Please provide a valid id");
    return this.http.get(`https://final-project-x2ln.onrender.com/api/users/${id}`, { headers: this.getHeaders() })
  }
  setValue(newValue: Partial<User>): void {
    this.user.next(newValue);
    this.saveUserToSessionStorage(newValue);

  }
  get currentValue(): Partial<User> {
    return this.user.value;
  }
 
  clearUser(): void {
    this.user.next({id:0,  name: '', email: '', password: '', token: '',roleName:'', });
    sessionStorage.removeItem('user'); // Clear from sessionStorage
  }

  private saveUserToSessionStorage(user: Partial<User>): void {

    sessionStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromSessionStorage(): Partial<User> {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : {Id:0,  Name: '', Email: '', Password: '', token: '',RoleName:'',};
  }
}
