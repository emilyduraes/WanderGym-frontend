import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Business } from '../entity/business';
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



  public findById(id: number): Observable<Business> {
    const url = `${this.businessUrl}/id/${id}`
    return this.http.get<Business>(url).pipe();
  }

  public findByName(name: string): Observable<Business[]> {
    const url = `${this.businessUrl}/name/${name}`
    if (!name.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Business[]>(url).pipe();
  }

  public findAll(): Observable<Business[]> {
    const url = `${this.businessUrl}/all`
    return this.http.get<Business[]>(url).pipe();
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
