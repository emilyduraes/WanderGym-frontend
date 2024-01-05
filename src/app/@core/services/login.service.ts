import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Auth } from '../entity/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_NAME_ROLE = "null";
  USER_NAME_ID = 0;
  public username: String;
  public password: String;

  private authUrl: string;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) {
    this.authUrl = "http://localhost:8080/wandergym/auth"
   }

  loginService(username: String, password: String) {
    return this.http.get(`http://localhost:8080/wandergym/auth/login`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  public login(auth: Auth): Observable<Auth>{
    const url = `${this.authUrl}/login`;
    return this.http.post<Auth>(url, auth, this.options);
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  public logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
  

  // public save(business: Business) {
  //   const url = `${this.businessUrl}/signin`
  //   return this.http.post<Business>(url, business);
  // }

  // public update(id: number, business: Business){
  //   const url = `${this.businessUrl}/id/${id}`
  //   return this.http.put<Business>(url, business);
  // }

  // public delete(id: number){
  //   const url = `${this.businessUrl}/id/${id}`
  //   return this.http.delete<Business>(url);
  // }
}
