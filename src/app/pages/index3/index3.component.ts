import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-index3',
  templateUrl: './index3.component.html',
  styleUrls: ['./index3.component.scss']
})
export class Index3Component implements OnInit {



  constructor() {}

  ngOnInit() {
  }
  
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev"><i class="mdi mdi-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="mdi mdi-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1024, // for screens >= 1024px wide
        settings: {
          arrows: true,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // for screens >= 768px wide
        settings: {
          arrows: false,
          slidesToScroll: 1
        }
      }
    ]
  };






}
