import { Component, OnInit } from "@angular/core";
import { PRODUCT } from "../services/mock.response";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../services/products.service";
import { HttpParams } from "@angular/common/http";
import { SNACK_BAR_DURATION } from "../utils/constants.utils";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.productId = param.productId;
    });

    if (this.productId) {
      this.getProductDetails(this.productId);
    }
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
    this.isVariantSelected = "selected";
  }

  addToCart() {
    if ((this.isVariantSelected = "not_selected")) {
      return;
    }
  }

  getProductDetails(productId: any) {
    const params = new HttpParams().set("productId", productId);
    this.productService.getProducts(params).subscribe(
      (data: any) => {
        console.log("product details", data.data);
        // if (data && data.data) {
        //   this.productDetails = data.data;
        // }
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
