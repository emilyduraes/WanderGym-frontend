import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Business, BusinessResponse } from '../entity/business';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private businessUrl: string;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient) {
    this.businessUrl = "http://localhost:8080/wandergym/business";
  }

  public findById(id: number): Observable<BusinessResponse> {
    const url = `${this.businessUrl}/id/${id}`
    return this.http.get<BusinessResponse>(url).pipe();
  }

  public findByEmail(email: string): Observable<BusinessResponse> {
    const url = `${this.businessUrl}/email/${email}`
    return this.http.get<BusinessResponse>(url).pipe();
  }
  
  public findByName(name: string): Observable<BusinessResponse[]> {
    const url = `${this.businessUrl}/name/${name}`
    if (!name.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<BusinessResponse[]>(url).pipe();
  }

  public findAll(): Observable<BusinessResponse[]> {
    const url = `${this.businessUrl}/all`
    return this.http.get<BusinessResponse[]>(url).pipe();
  }

  public save(business: Business) {
    const url = `${this.businessUrl}/signin`
    return this.http.post<Business>(url, business, this.options).pipe();
  }

  public update(id: number, business: Business) {
    const url = `${this.businessUrl}/id/${id}`
    return this.http.put<Business>(url, business, this.options).pipe();
  }

  public delete(id: number) {
    const url = `${this.businessUrl}/id/${id}`
    return this.http.delete<Business>(url).pipe();
  }

}
