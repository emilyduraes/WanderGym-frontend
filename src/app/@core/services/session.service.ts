import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../entity/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionUrl: string;

  constructor(private http: HttpClient) {
    this.sessionUrl = "http://localhost:8080/wandergym/session";
   }

   public getAttendance(id: number): Observable<Session>{
    const url = `${this.sessionUrl}/${id}/attendance`
    return this.http.get<Session>(url);
  }
  
  public save(session: Session) {
    const url = `${this.sessionUrl}/start`
    return this.http.post<Session>(url, session);
  }
}
