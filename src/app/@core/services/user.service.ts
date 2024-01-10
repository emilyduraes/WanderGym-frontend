import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserResponse } from '../entity/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient) {
    this.usersUrl = "http://localhost:8080/wandergym/user";
  }

  public findById(id: number): Observable<UserResponse> {
    const url = `${this.usersUrl}/id/${id}`
    return this.http.get<UserResponse>(url).pipe();
  }

  public findByEmail(email: string): Observable<UserResponse> {
    const url = `${this.usersUrl}/email/${email}`
    return this.http.get<UserResponse>(url).pipe();
  }

  public save(user: User) {
    const url = `${this.usersUrl}/signin`
    return this.http.post<User>(url, user, this.options).pipe();
  }

  public update(id: number, user: User) {
    const url = `${this.usersUrl}/id/${id}`
    return this.http.put<User>(url, user, this.options).pipe();
  }

  public delete(id: number) {
    const url = `${this.usersUrl}/id/${id}`
    return this.http.delete<User>(url).pipe();
  }

}
