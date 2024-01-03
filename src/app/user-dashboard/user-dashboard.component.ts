import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../@core/services/user.service';
import { Business } from '../@core/entity/business';
import { BusinessService } from '../@core/services/business.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {

  constructor(private renderer: Renderer2, private userService: UserService, private businessService: BusinessService) { }

  year = (new Date().getFullYear());

  businesses: Business[];

  ngOnInit(): void {

    //FIXME: the data is persisted but is not showing in page (no errors occur)
    this.businessService.findAll().subscribe(data => {
      this.businesses = data[0];
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

}
