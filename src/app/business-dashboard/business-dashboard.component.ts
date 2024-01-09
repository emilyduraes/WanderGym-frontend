import { Component, Renderer2 } from '@angular/core';
import { UserService } from '../@core/services/user.service';
import { BusinessService } from '../@core/services/business.service';


@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrl: './business-dashboard.component.scss'
})
export class BusinessDashboardComponent {

  constructor(private renderer: Renderer2, private userService: UserService, private businessService: BusinessService) { }

  year = (new Date().getFullYear());

  
  ngOnInit(): void {

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

}
