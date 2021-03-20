import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PRODUCTS } from "./../services/mock.response";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../utils/constants.utils';

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"]
})
export class ProductsListComponent implements OnInit {
  categoryName: string = "";
  productList: Array<any> = [];
  sliders: Array<any> = [];

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sliders.push(
      {
        imagePath: "./assets/images/banner1.webp",
        label: "First slide label",
        text: ""
      },
      {
        imagePath: "./assets/images/banner2.jpg",
        label: "Second slide label",
        text: ""
      },
      {
        imagePath: "./assets/images/banner3.webp",
        label: "Third slide label",
        text: ""
      }
    );

    this.route.queryParams.subscribe(param => {
      this.categoryName = param.category;
    });

    if (this.categoryName) {
      this.getProductList(this.categoryName);
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 150) {
      let element: any = document.getElementById("navbar");
      element.classList.add("sticky");
    } else {
      let element: any = document.getElementById("navbar");
      element.classList.remove("sticky");
    }
  }

  getProductList(category: any) {
    this.productList = PRODUCTS;
  }

  addTOCart(prod:any, size:any, quantity:any) {
    let cartItems = localStorage.getItem('cartItems');
    if(cartItems) {
      let productList:any = JSON.parse(cartItems)
      let found: boolean = false;
      for (const product of productList.items) {
        if(product.id === prod.id) {
          found = true
          product.quantity +=quantity;
        }
      }
      if(!found) {
        productList.items.push({...prod, size: size, quantity:quantity})
      }
      localStorage.setItem('cartItems', JSON.stringify(productList));
      this.snackBar.open('Product added to your cart successfully!', 'Close', {
        duration: SNACK_BAR_DURATION,
      });
    } else {
      let prepartCartObj = {
        items: [ {...prod, size: size, quantity:quantity}]
      }
      localStorage.setItem('cartItems', JSON.stringify(prepartCartObj));
      this.snackBar.open('Product added to your cart successfully!', 'Close', {
        duration: SNACK_BAR_DURATION,
      });
    }
  }
}
