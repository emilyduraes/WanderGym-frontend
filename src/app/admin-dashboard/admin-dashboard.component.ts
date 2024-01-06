import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from '../@core/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

  constructor(private renderer: Renderer2, private loginService: LoginService) { }

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

  handleLogout() {
    this.loginService.logout();
  }
}
