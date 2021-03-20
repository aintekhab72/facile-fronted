import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CART } from "../services/mock.response";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  SNACK_BAR_DURATION,
  GST,
  SHIPPING_CHARGES
} from "../utils/constants.utils";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  @ViewChild("stepper") stepper: MatStepper;
  public cartItems: any;
  public firstFormGroup!: FormGroup;
  public secondFormGroup!: FormGroup;
  public isEditable = false;
  public cartTotal = 0;
  public gst = GST;
  public shippingCharges = SHIPPING_CHARGES;
  public totalPayable = 0;
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

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //Read cart items from local storage
    let carts: any = localStorage.getItem("cartItems");
    let productList: any = JSON.parse(carts);
    if (productList) {
      this.cartItems = productList.items;
      this.calculateTotalPayable(this.cartItems);
    } else {
      this.cartItems = [];
    }
  }

  removeItems(cart: any) {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      //remove items
      let productList: any = JSON.parse(cartItems);
      const data = productList.items.filter((item: any) => item.id !== cart.id);
      let prepartCartObj = {
        items: data
      };
      localStorage.setItem("cartItems", JSON.stringify(prepartCartObj));

      //Get items
      let carts: any = localStorage.getItem("cartItems");
      let updatedList: any = JSON.parse(carts);
      if (updatedList) {
        this.cartItems = updatedList.items;
      } else {
        this.cartItems = [];
      }
      this.snackBar.open(
        "Product removed from your cart successfully!",
        "Close",
        {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        }
      );
      this.calculateTotalPayable(this.cartItems);
    }
  }

  selectOption(event: any, prod: any) {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      let productList: any = JSON.parse(cartItems);
      for (const product of productList.items) {
        if (product.id === prod.id) {
          product.quantity = event.target.value;
        }
      }
      this.cartItems = productList.items;
      localStorage.setItem("cartItems", JSON.stringify(productList));
      this.snackBar.open("Cart updated successfully!", "Close", {
        duration: SNACK_BAR_DURATION
      });
      this.calculateTotalPayable(this.cartItems);
    }
  }

  calculateTotalPayable(cartItems: any) {
    let cartTotal = 0;
    cartItems.forEach((element: any) => {
      cartTotal += element.quantity * element.mrp;
    });
    this.cartTotal = cartTotal;
    this.totalPayable = this.cartTotal + this.gst + this.shippingCharges;
  }

  goToNextStep() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }
}
