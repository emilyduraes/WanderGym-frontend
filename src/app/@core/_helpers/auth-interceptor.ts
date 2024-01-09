import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  private loginUrl = "http://localhost:8080/wandergym/auth/login";
  private registerUrl = "http://localhost:8080/wandergym/auth/register";



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if its a register request
    if (req.url == this.registerUrl) {
      return next.handle(req);
    }

    // if its a login request, cache the response
    if (req.url == this.loginUrl) {
      return next.handle(req).pipe(
        tap((res) => {
          if (res instanceof HttpResponse) {
            this.cache.set(req.url, res);
          }
        })
      )
    }

    // set token to the request
    const authRes = this.cache.get(this.loginUrl);

    if (authRes != undefined) {
      const token = authRes.body.login.responseObject.basicAuthorization;
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        })
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }

  getCache() {
    return this.cache.get(this.loginUrl);
  }

}
