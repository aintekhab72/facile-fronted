import { Component, OnInit } from "@angular/core";
import { PRODUCT } from "../services/mock.response";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../services/products.service";
import { HttpParams } from "@angular/common/http";
import { SNACK_BAR_DURATION } from "../utils/constants.utils";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CartService } from "../services/cart.service";
import { HeaderService } from '../services/header.service';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  public productDetails = PRODUCT;
  public quatityOptions: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
  ];
  public cartQuantity: number = 1;
  public selectedVariant: any;
  public isVariantSelected: string = "not_selected";
  public productId: string;
  public cartId: any;
  public showError: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.productId = param.productId;
    });

    if (this.productId) {
      this.getProductDetails(this.productId);
    }

    let userInfo: any = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      this.cartId = userInfo.cart_id;
    }
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
    this.isVariantSelected = "selected";
  }

  addToCart() {
    this.showError = false;
    if (this.isVariantSelected === "not_selected") {
      this.showError = true;
      return;
    } else {
      let cartObject = {
        cart_id: this.cartId,
        variant_id: this.selectedVariant._id,
        quantity: this.cartQuantity
      };
      this.cartService.addCart(cartObject).subscribe(
        (data: any) => {
          if (data && data.data) {
            this.snackBar.open("Cart added successfully!", "Close", {
              duration: SNACK_BAR_DURATION
            });
            this.selectedVariant = null;
            this.isVariantSelected = "not_selected";
            this.headerService.setCount.next('call');
          }
        },
        (error: any) => {
          let errorMessage = error.message || "No Cart found";
          this.snackBar.open(errorMessage, "Close", {
            panelClass: "snack-error-message",
            duration: SNACK_BAR_DURATION
          });
        }
      );
    }
  }

  getProductDetails(productId: any) {
    const params = new HttpParams().set("productId", productId);
    this.productService.getProducts(params).subscribe(
      (data: any) => {
        if (data && data.data) {
          this.productDetails = data.data;
        }
      },
      (error: any) => {
        let errorMessage = error.message || "Product not found";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
  }
}
