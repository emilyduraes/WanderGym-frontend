import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../@core/services/login.service';
import { Auth } from '../@core/entity/auth';
import { User } from '../@core/entity/user';
import { Business } from '../@core/entity/business';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  USER_SESSION_ATTRIBUTE_NAME: string;
  USER_ROLE: string;
  USER_ID = 0;
  USER_TOKEN: string;
  loggedUser: boolean;
  user: User;
  business: Business;

  year = (new Date().getFullYear());

  auth: Auth;
  errorMessage = 'Invalid Credentials, please try again';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;


  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.auth = new Auth();
  }

  public handleLogin() {

    this.loginService.login(this.auth).subscribe({
      next: (result) => {
        this.auth = result;
        this.USER_ROLE = result.login.responseObject.role;
        this.USER_TOKEN = result.login.responseObject.basicAuthorization;
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        window.localStorage.setItem("username", result.login.responseObject.username);
        window.localStorage.setItem("user-role", result.login.responseObject.role);

        if (this.USER_ROLE === 'ROLE_USER') {
          this.router.navigate(['/user-dashboard']);
        } else if (this.USER_ROLE === 'ROLE_BUSINESS') {
          this.router.navigate(['/business-dashboard']);
        } else if (this.USER_ROLE === 'ROLE_SYSADMIN') {
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

}
