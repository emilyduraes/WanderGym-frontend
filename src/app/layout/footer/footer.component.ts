import { Conditional } from '@angular/compiler';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  year = (new Date().getFullYear());

  constructor(private render: Renderer2) { }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // color switcher
  toggleSwitcher() {
    const switcher = document.getElementById('style-switcher')
    switcher!.style.left == "0px" ? switcher!.style.left = "-189px" : switcher!.style.left = "0px"
  }

  setColor(theme: any) {
    const link = this.render.createElement('link');
    this.render.setAttribute(link, 'rel', 'stylesheet');  // setAttribute() method is used to add attributes in HTML elements and SVG elements
    this.render.setAttribute(link, 'href', 'assets/css/colors/' + theme + '.css');
    this.render.appendChild(document.head, link)

  }
}
