import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login.service';
import { AuthInterceptor } from './auth-interceptor';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private authInterceptor: AuthInterceptor
    ) {}

    // manages the pages access authorization
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authInterceptor.getCache();
        if (user) {

            //check if user has admin auth
            if(user.body.responseObject.role === 'ROLE_SYSADMIN'){
                // authorised so return true
                return true;
            }

            //check if user has user auth
            if(route.url[0].path == 'user-dashboard' && user.body.responseObject.role === 'ROLE_USER'){
                // authorised so return true
                return true;
            }

            //check if user has business auth
            if(route.url[0].path == 'business-dashboard' && user.body.responseObject.role === 'ROLE_BUSINESS'){
                // authorised so return true
                return true;
            }
            
            // not authorized so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}