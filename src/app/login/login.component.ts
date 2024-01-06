import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  USER_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_ROLE = "null";
  USER_ID = 0;
  USER_TOKEN = "null";
  user: User;
  business: Business;

  year =(new Date().getFullYear());

  auth: Auth;
  username: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) {   }

    ngOnInit() {
      this.auth = new Auth();
  }
  
  public handleLogin() {

    this.USER_SESSION_ATTRIBUTE_NAME = this.auth.email;
    
    this.loginService.login(this.auth).subscribe({
      next: (result) => {
        this.auth = result;
        this.USER_ROLE = result.login.responseObject.authorities[0].authority;
        this.USER_TOKEN = result.login.responseObject.basicAuthorization;
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        
        if(this.USER_ROLE === 'ROLE_USER'){
          this.router.navigate(['/user-dashboard']);
        } else if(this.USER_ROLE === 'ROLE_BUSINESS'){
          this.router.navigate(['/business-dashboard']);
        } else if(this.USER_ROLE === 'ROLE_SYSADMIN'){
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
