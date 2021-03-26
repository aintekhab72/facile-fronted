import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  cartItems: number = 0;
  category: any;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.getCartList();
  }

  getCategoryList() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.category = data.data.map((cat: any) => {
        return {
          id: cat._id,
          categoryName: cat.name
        };
      });
    });
  }

  getProducts(cat: any) {
    this.router.navigate(["/products"], {
      queryParams: { category: cat.id, categoryName: cat.categoryName }
    });
  }

  getCartList() {
    let carts: any = localStorage.getItem("cartItems");
    let productList: any = JSON.parse(carts);
    if (productList) {
      this.cartItems = productList.items.length;
    }
  }
}
