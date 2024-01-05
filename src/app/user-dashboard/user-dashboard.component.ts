import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../@core/services/user.service';
import { Business } from '../@core/entity/business';
import { BusinessService } from '../@core/services/business.service';
import { SessionService } from '../@core/services/session.service';
import { LoginService } from '../@core/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}

  constructor(private renderer: Renderer2, 
    private userService: UserService, 
    private businessService: BusinessService, 
    private sessionService: SessionService,
    private loginService: LoginService) { }

  year = (new Date().getFullYear());

  businesses: Business[];

  isLoggedIn = false;

  ngOnInit(): void {

    this.isLoggedIn = this.loginService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);

    //FIXME: the data is persisted but is not showing in page (no errors occur)
    this.businessService.findAll().subscribe(data => {
      this.businesses = data;
      console.log(data);
    });

    const preloaderElement = document.getElementById('preloader');
    
    if (preloaderElement) {
      this.renderer.removeClass(preloaderElement, 'd-none')
    }
    setTimeout(() => {
      this.renderer.addClass(preloaderElement, 'd-none');
    }, 1000);

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

  // TODO: add create session function
  // createSession() {
  //   this.sessionService.save()
  // }
}
