import { Component, Renderer2 } from '@angular/core';
import { BusinessService } from '../@core/services/business.service';
import { Business } from '../@core/entity/business';
import { LoginService } from '../@core/services/login.service';


@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrl: './business-dashboard.component.scss'
})
export class BusinessDashboardComponent {

  constructor(private renderer: Renderer2, private loginService: LoginService, private businessService: BusinessService) { }

  year = (new Date().getFullYear());
  business: Business = {
    name: '',
    email: '',
    phoneNumber: 0,
    address: '',
    description: '',
    type: ''
  };
  
  ngOnInit(): void {

    const preloaderElement = document.getElementById('preloader');
    
    if (preloaderElement) {
      this.renderer.removeClass(preloaderElement, 'd-none')
    }
    setTimeout(() => {
      this.renderer.addClass(preloaderElement, 'd-none');
    }, 1000);

    // get user data from API and store in browser some values
    this.businessService.findByEmail(window.localStorage.getItem("username")).subscribe(data => {
      console.log(data);
      this.business.email = data.business.email;
      this.business.name = data.business.name;
      this.business.id = data.business.id;
      this.business.address = data.business.address;
      window.localStorage.setItem("full-name", data.business.name);
      window.localStorage.setItem("user-id", data.business.id.toString());   
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

}
