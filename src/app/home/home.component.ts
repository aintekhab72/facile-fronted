import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade',
      [
        state('void', style({ opacity: 0 })),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )]
})
export class HomeComponent implements OnInit {
  category: any = [];
  public sliders: Array<any> = [];

  constructor() {
    this.sliders.push(
      {
        imagePath: './assets/images/banner1.webp',
        label: 'First slide label',
        text: ''
      },
      {
        imagePath: './assets/images/banner2.jpg',
        label: 'Second slide label',
        text: ''
      },
      {
        imagePath: './assets/images/banner3.webp',
        label: 'Third slide label',
        text: ''
      }
    );
  }

  ngOnInit(): void {
    this.category = [
      {
        categoryName: 't-shirts',
        categoryImage: './assets/images/t-shirt.png'
      },
      {
        categoryName: 'polo t-shirts',
        categoryImage: './assets/images/t-shirt.png'
      }
    ]
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 150) {
      let element: any = document.getElementById('navbar');
      element.classList.add('sticky');
    } else {
      let element: any = document.getElementById('navbar');
      element.classList.remove('sticky');
    }
  }

}
