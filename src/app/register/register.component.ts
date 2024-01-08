import { Component, Renderer2, inject } from '@angular/core';
import { Auth } from '../@core/entity/auth';
import { LoginService } from '../@core/services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../@core/services/user.service';
import { BusinessService } from '../@core/services/business.service';
import { Business } from '../@core/entity/business';
import { User } from '../@core/entity/user';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  year = (new Date().getFullYear());

  USER_SESSION_ATTRIBUTE_NAME: string;
  USER_ID = 0;
  USER_TOKEN: string;

  auth: Auth;
  user: User = {
    fullName: '',
    email: '',
    dob: undefined,
    mobileNumber: 0,
    address: '',
    active: false
  };
  business: Business = {
    name: '',
    email: '',
    phoneNumber: 0,
    address: '',
    description: '',
    type: ''
  };
  username: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  userRole: string;
  businessRole: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private businessService: BusinessService) { }

  ngOnInit() {
    this.auth = new Auth();
    this.userRole = "ROLE_USER";
    this.businessRole = "ROLE_BUSINESS";
    ;
  }

  handleRegister() {
    try {
      const createNewAccount = new Observable<void>((observer) => {

        // register new user
        this.loginService.register(this.auth).subscribe();

        // create API entities
        if (this.auth.role === 'ROLE_USER') {
          // assign email from entity auth to entity user
          this.user.email = this.auth.username;
          // create user
          this.handleUserAccount(this.user);
        } else if (this.auth.role === 'ROLE_BUSINESS') {
          // assign email from entity auth to entity business
          this.business.email = this.auth.username;
          // create business
          this.handleBusinessAccount(this.business);
        }
        console.log("register function finalized");
        observer.complete();
      });

      // after the API response, login user
      createNewAccount.subscribe(() => this.handleLogin(this.auth));
    }

    catch (error) {
      console.log(error.message);
    }
  }

  handleLogin(auth: Auth) {

    return this.loginService.login(auth).subscribe({
      next: (result) => {
        this.auth = result;
        this.USER_TOKEN = result.login.responseObject.basicAuthorization;
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';

        if (this.auth.role === 'ROLE_USER') {
          // when logged as user, redirect to user-dashboard
          this.router.navigate(['/user-dashboard']);
        } else if (this.auth.role === 'ROLE_BUSINESS') {
          // when logged as business, redirect to business-dashboard
          this.router.navigate(['/business-dashboard']);
        } else if (this.auth.role === 'ROLE_SYSADMIN') {
          // when logged as admin, redirect to admin-dashboard
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: (error) => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        console.log(error)
      }
    })
  }

  handleUserAccount(user: User) {
    return this.userService.save(user).subscribe(res => console.log("create user resp: " + res));
  }

  handleBusinessAccount(business: Business) {
    return this.businessService.save(business).subscribe(res => console.log("create business resp: " + res));
  }

}
