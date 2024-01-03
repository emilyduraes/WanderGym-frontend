import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../entity/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = "http://localhost:8080/wandergym/user";
   }

  public findById(id: number): Observable<User>{
    const url = `${this.usersUrl}/id/${id}`
    return this.http.get<User>(url);
  }
  
  public save(user: User) {
    const url = `${this.usersUrl}/signin`
    return this.http.post<User>(url, user);
  }

  public update(id: number, user: User){
    const url = `${this.usersUrl}/id/${id}`
    return this.http.put<User>(url, user);
  }

  public delete(id: number){
    const url = `${this.usersUrl}/id/${id}`
    return this.http.delete<User>(url);
  }
}
