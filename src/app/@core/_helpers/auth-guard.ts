import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.loginService.isUserLoggedIn();
        if (user) {

            //check if user has admin auth
            if(this.loginService.getUserRole() === 'ROLE_SYSADMIN'){
                // authorised so return true
                return true;
            }

            //check if user has user auth
            if(route.url[0].path == 'user-dashboard' && this.loginService.getUserRole() === 'ROLE_USER'){
                // authorised so return true
                return true;
            }

            //check if user has business auth
            if(route.url[0].path == 'business-dashboard' && this.loginService.getUserRole() === 'ROLE_USER'){
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