import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landsay';

  constructor(private render : Renderer2){

  }

  ngOnInit():void{
    const link= this.render.createElement('link');
    this.render.setAttribute(link,'rel','stylesheet') ;  // setAttribute() method is used to add attributes in HTML elements and SVG elements
    this.render.setAttribute(link,'href','assets/css/colors/default.css');
    this.render.appendChild(document.head,link)
  }
}
