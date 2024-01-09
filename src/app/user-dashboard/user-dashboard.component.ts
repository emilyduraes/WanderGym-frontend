import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../@core/services/user.service';
import { Business } from '../@core/entity/business';
import { BusinessService } from '../@core/services/business.service';
import { SessionService } from '../@core/services/session.service';
import { LoginService } from '../@core/services/login.service';
import { User } from '../@core/entity/user';
import { Observable } from 'rxjs';
import { Auth } from '../@core/entity/auth';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private userService: UserService,
    private businessService: BusinessService,
    private sessionService: SessionService,
    private loginService: LoginService) {    }

  year = (new Date().getFullYear());


  businesses: Business[];

  auth: Observable<Auth>;

  isLoggedIn = false;

  business: Business = {
    name: '',
    email: '',
    phoneNumber: 0,
    address: '',
    description: '',
    type: ''
  };

  user: User = {
    fullName: '',
    email: '',
    dob: undefined,
    mobileNumber: 0,
    address: ''
  };

  username: string = window.localStorage.getItem("username");


  ngOnInit(): void {

    console.log('menu ->' + this.isLoggedIn);

    this.userService.findByEmail(window.localStorage.getItem("username")).subscribe(data => {
      this.user.email = data[0].email;
      this.user.fullName = data[0].fullName;
      this.user.id = data[0].id;
      this.user.address = data[0].address;
      console.log(data);
      window.localStorage.setItem("full-name", data[0].fullName);
      window.localStorage.setItem("user-id", data[0].id.toString());   
    });


    

    const preloaderElement = document.getElementById('preloader');

    if (preloaderElement) {
      this.renderer.removeClass(preloaderElement, 'd-none')
    }
    setTimeout(() => {
      this.renderer.addClass(preloaderElement, 'd-none');
    }, 1000);


    //FIXME: the data is persisted but is not showing in page
    this.businessService.findAll().subscribe(data => {
      this.businesses = data;
      console.log(data);
    });

  }

  //togglemenu
  toggleMenu() {
    document.getElementById('navbarSupportedContent')!.classList.toggle('show')
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleLogout() {
    this.loginService.logout();
  }

  getName(){
    return window.localStorage.getItem("full-name");
  }


  // TODO: add create session function
  // createSession() {
  //   this.sessionService.save()
  // }
}
