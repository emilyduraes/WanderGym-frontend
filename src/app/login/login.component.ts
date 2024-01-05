import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../@core/services/login.service';
import { Auth } from '../@core/entity/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  year =(new Date().getFullYear());

  auth: Auth;
  username: string;
  password : string;
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
    this.loginService.login(this.auth).subscribe({
      next: (result) => {
        this.auth = result;
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.router.navigate(['/user-dashboard']);
      },
      error: (error) => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        console.log(error)
      }
    })
  }     


  // {
  //   next: (result) => {
  //     this.invalidLogin = false;
  //     this.loginSuccess = true;
  //     this.successMessage = 'Login Successful.';
  //     this.router.navigate(['/user-dashboard']);
  //     console.log(result)
  //   }, 
  //   error: (error) => {
  //     this.invalidLogin = true;
  //     this.loginSuccess = false;
  //     console.log(error)
  //   },
  //   complete: () => {
  //       console.log("complete")
  //   }
  // }
}
