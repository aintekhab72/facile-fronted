import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";
import { HeaderService } from "src/app/services/header.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public cartItems: number = 0;
  public category: any;
  public currentUser:any;
  public userName: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private headerService: HeaderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.getCartList();
    let userInfo: any = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    this.currentUser = userInfo;
    if (userInfo) {
      this.headerService.isLoggedIn.subscribe((data: any) => {
        if (data === true) this.isLoggedIn();
      });
      this.userName = userInfo.name.split(" ")[0]
      this.headerService.setCount.next("init");
      const cartId = userInfo.cart_id;
      this.headerService.setCount.subscribe((count: any) => {
        if (count === "call" || count === "init") this.getCarts(cartId);
      });
    }
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
    this.headerService.setCategory.next('productList');
    this.router.navigate(["/products"], {
      queryParams: { category: cat.id, categoryName: cat.categoryName }
    });
  }

  getCartList() {
    let userInfo: any = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      const cartId = userInfo.cart_id;
      this.headerService.setCount.subscribe((count: any) => {
        if (count === "call" || count === "init") this.getCarts(cartId);
      });
    }
    //Local storage cart
    // } else {
    //   // let carts: any = localStorage.getItem("cartItems");
    //   // let productList: any = JSON.parse(carts);
    //   // if (productList) {
    //   //   this.cartItems = productList.items.length;
    //   // }
    // }
  }

  getCarts(cartId: any) {
    this.cartService.getCarts(cartId).subscribe(
      (data: any) => {
        if (data && data.data && data.data.cart_items) {
          this.cartItems = data.data.cart_items.length;
        }
      },
      (error: any) => {}
    );
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }

  logout() {
    this.headerService.isLoggedIn.next(false);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accesstoken');
    this.router.navigate(["/"]);
    setTimeout(() => {
      window.location.reload();
    }, 10)
  }
}
