import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Auth } from '../entity/auth';
import { Cache } from '../_helpers/cache-decorator';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  USER_SESSION_ATTRIBUTE_NAME: string;
  USER_ROLE: string;
  USER_ID = 0;
  USER_TOKEN: string;

  private authUrl: string;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  private authResponse: Observable<any>

  constructor(private http: HttpClient) {
    this.authUrl = "http://localhost:8080/wandergym/auth"
  }

  public login(auth: Auth): Observable<Auth> {
    const url = `${this.authUrl}/login`;
    this.authResponse = this.http.post<Auth>(url, auth, this.options).pipe(
      shareReplay());
    return this.authResponse;
  }

  public logout() {
    const url = `${this.authUrl}/logout`;
    this.http.get<Auth>(url).pipe();
  }

  public register(auth: Auth){
    const url = `${this.authUrl}/register`;
    return this.http.post<Auth>(url, auth, this.options).pipe();
  }

  isUserLoggedIn() {
    let user = this.USER_SESSION_ATTRIBUTE_NAME
    if (user != undefined) {
      return true;
    }
    return false;
  }

  getLoggedInUserName() {
    let user = this.USER_SESSION_ATTRIBUTE_NAME
    if (user != null) {
      return '';
    } else {
      return user;
    }
  }

  public getAuthObservableResponse(): Observable<any> {
    return this.authResponse;
  }

  // @Cache()
  public getToken(): string {
    if(this.authResponse != undefined){
      this.authResponse.subscribe({
        next: (result) => {
          this.USER_ROLE = result.login.responseObject.authorities[0].authority;
          this.USER_TOKEN = result.login.responseObject.basicAuthorization;
          this.USER_SESSION_ATTRIBUTE_NAME = result.login.responseObject.username;
        },
        error: (error) => {
          console.log(error)
        }
      });
      return this.USER_TOKEN;
    }
    return '';
  }

  public getUserRole(): string {
    this.authResponse.subscribe({
      next: (result) => {
        this.USER_ROLE = result.login.responseObject.authorities[0].authority;
      },
      error: (error) => {
        console.log(error)
      }
    });
    return this.USER_ROLE;
  }

}
