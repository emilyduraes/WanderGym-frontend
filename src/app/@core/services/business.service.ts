import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Business } from '../entity/business';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) {
    this.businessUrl = "http://localhost:8080/wandergym/business";
   }

  private businessUrl: string;

  public findById(id: number): Observable<Business>{
    const url = `${this.businessUrl}/id/${id}`
    return this.http.get<Business>(url);
  }

  public findAll(): Observable<Business> {
    const url = `${this.businessUrl}/all`
    return this.http.get<Business>(url);
  }
  
  public save(business: Business) {
    const url = `${this.businessUrl}/signin`
    return this.http.post<Business>(url, business);
  }

  public update(id: number, business: Business){
    const url = `${this.businessUrl}/id/${id}`
    return this.http.put<Business>(url, business);
  }

  public delete(id: number){
    const url = `${this.businessUrl}/id/${id}`
    return this.http.delete<Business>(url);
  }

}
