import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const preloaderElement = document.getElementById('preloader');
    if (preloaderElement) {
      this.renderer.removeClass(preloaderElement, 'd-none')
    }
    setTimeout(() => {
      this.renderer.addClass(preloaderElement, 'd-none');
    }, 1000);
  }

  curentsection: any = 'home';


  onSectionChange(event: any) {
    this.curentsection = event;
  }

  windoscroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      navbar?.classList.add('nav-sticky');
      document.getElementById('back-to-top')!.style.display = 'block'
    }
    else {
      navbar?.classList.remove('nav-sticky');
      document.getElementById('back-to-top')!.style.display = 'none'
    }
  }

  //togglemenu
  toggleMenu() {
    document.getElementById('navbarSupportedContent')!.classList.toggle('show')
  }


}
