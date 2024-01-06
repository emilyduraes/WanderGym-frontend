import { Component, Renderer2 } from '@angular/core';
import { Auth } from '../@core/entity/auth';
import { LoginService } from '../@core/services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../@core/services/user.service';
import { BusinessService } from '../@core/services/business.service';
import { Business } from '../@core/entity/business';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  year =(new Date().getFullYear());

  USER_SESSION_ATTRIBUTE_NAME: string;
  USER_ROLE: string;
  USER_ID = 0;
  USER_TOKEN: string;

  auth: Auth;
  business: Business;
  username: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  userRole: string;
  businessRole: string;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private loginService: LoginService,
    private userService: UserService,
    private businessService: BusinessService) {   }

    ngOnInit() {
      this.auth = new Auth();
      this.userRole = "ROLE_USER";
      this.businessRole = "ROLE_BUSINESS";
      this.renderer.setProperty
  }

  handleRegister(){
    this.loginService.register(this.auth).subscribe({
      next: (result) => {
        this.auth = result;
        this.handleLogin(this.auth);
        if(this.USER_ROLE === 'ROLE_USER'){
          this.handleUserAccount();
        } else if (this.USER_ROLE === 'ROLE_BUSINESS'){
          this.handleBusinessAccount();
        }
        
       
      },
      error: (error) => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        console.log(error)
      }
    })
  }

  handleLogin(auth: Auth){
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

  // TODO: implement method
  handleUserAccount(){

  }

  // TODO: implement method
  handleBusinessAccount(){

  }
    
}
