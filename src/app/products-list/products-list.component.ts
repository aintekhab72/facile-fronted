import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PRODUCTS } from "./../services/mock.response";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"]
})
export class ProductsListComponent implements OnInit {
  categoryName: string = "";
  productList: Array<any> = [];
  sliders: Array<any> = [];

  constructor(private route: ActivatedRoute) {}

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
}
