import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { CART, ADDRESS } from "../services/mock.response";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  SNACK_BAR_DURATION,
  GST,
  SHIPPING_CHARGES
} from "../utils/constants.utils";
import { MatStepper } from "@angular/material/stepper";
import { HttpParams } from "@angular/common/http";
import { ShippingAddressService } from "../services/shipping-address.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  @ViewChild("stepper") stepper: MatStepper;
  public cartItems: any[] = [];
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

  //Address
  public addressForm!: FormGroup;
  public addressList: any[] = [];
  public showAddressFields: boolean = false;
  public addressId = 3;
  public event = "add_address";
  public selectedAddress: any;
  public shippingAddressId: any;
  public cartId: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private shippingAddress: ShippingAddressService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    //Read cart items from local storage
    // let carts: any = localStorage.getItem("cartItems");
    // let productList: any = JSON.parse(carts);
    // if (productList) {
    //   this.cartItems = productList.items;
    //   this.calculateTotalPayable(this.cartItems);
    // } else {
    //   this.cartItems = [];
    // }

    let userInfo: any = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      this.shippingAddressId = userInfo.shipping_address_id;
      if (this.shippingAddressId) {
        this.getShippingAddress(this.shippingAddressId);
      }
      this.cartId = userInfo.cart_id;
      if (this.cartId) {
        this.getCarts(this.cartId);
      }
    }

    this.addressForm = this.fb.group({
      id: 0,
      addressLine1: new FormControl("", [Validators.required]),
      addressLine2: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      pincode: new FormControl("", [Validators.required]),
      landmark: new FormControl("", [Validators.required]),
      elementId: new FormControl("")
    });
  }

  getCarts(cartId: any) {
    this.cartService.getCarts(cartId).subscribe(
      (data: any) => {
        if (data && data.data && data.data.cart_items) {
          this.cartItems = data.data.cart_items;
          this.calculateTotalPayable(this.cartItems);
        }
      },
      (error: any) => {
        let errorMessage = error.message || "No Address found";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
  }

  deleteCart(cart: any) {
    if (cart) {
      this.cartService.deleteCart(this.cartId, cart.element_id).subscribe(
        (data: any) => {
          if (data) {
            this.snackBar.open("Cart deleted successfully!", "Close", {
              duration: SNACK_BAR_DURATION
            });
            this.getCarts(this.cartId);
          }
        },
        (error: any) => {
          let errorMessage =
            error.message || "Unable to delete cart, please try again";
          this.snackBar.open(errorMessage, "Close", {
            panelClass: "snack-error-message",
            duration: SNACK_BAR_DURATION
          });
        }
      );
    }
  }

  //Dont remove
  // removeItems(cart: any) {
  //   let cartItems = localStorage.getItem("cartItems");
  //   if (cartItems) {
  //     //remove items
  //     let productList: any = JSON.parse(cartItems);
  //     const data = productList.items.filter(
  //       (item: any) => item._id !== cart._id
  //     );
  //     let prepartCartObj = {
  //       items: data
  //     };
  //     localStorage.setItem("cartItems", JSON.stringify(prepartCartObj));

  //     //Get items
  //     let carts: any = localStorage.getItem("cartItems");
  //     let updatedList: any = JSON.parse(carts);
  //     if (updatedList) {
  //       this.cartItems = updatedList.items;
  //     } else {
  //       this.cartItems = [];
  //     }
  //     this.snackBar.open(
  //       "Product removed from your cart successfully!",
  //       "Close",
  //       {
  //         duration: 2000,
  //         horizontalPosition: "end",
  //         verticalPosition: "top"
  //       }
  //     );
  //     this.calculateTotalPayable(this.cartItems);
  //   }
  // }

  selectOption(event: any, cartItem: any) {
    let cartObj = {
      cart_id: this.cartId,
      element_id: cartItem.element_id,
      variant_id: cartItem.variant_id,
      quantity: event.target.value
    };
    this.cartService.updateCart(cartObj).subscribe(
      (data: any) => {
        if (data) {
          this.snackBar.open("Cart updated successfully!", "Close", {
            duration: SNACK_BAR_DURATION
          });
          this.getCarts(this.cartId);
        }
      },
      (error: any) => {
        let errorMessage =
          error.message || "Unable to update Cart, please try again";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
    // Dont remove it is usefull for localstorage
    // let cartItems = localStorage.getItem("cartItems");
    // if (cartItems) {
    //   let productList: any = JSON.parse(cartItems);
    //   for (const product of productList.items) {
    //     if (product._id === prod._id) {
    //       product.quantity = event.target.value;
    //     }
    //   }
    //   this.cartItems = productList.items;
    //   localStorage.setItem("cartItems", JSON.stringify(productList));
    //   this.snackBar.open("Cart updated successfully!", "Close", {
    //     duration: SNACK_BAR_DURATION
    //   });
    //   this.calculateTotalPayable(this.cartItems);
    // }
  }

  calculateTotalPayable(cartItems: any) {
    let cartTotal = 0;
    cartItems.forEach((element: any) => {
      cartTotal += element.quantity * element.product_details.mrp;
    });
    this.cartTotal = cartTotal;
    this.totalPayable = this.cartTotal + this.gst + this.shippingCharges;
  }

  goToNextStep() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  //Address sections start here
  addAddress() {
    if (this.event === "add_address") {
      if (this.addressForm.valid) {
        const addressObj = {
          address_id: this.shippingAddressId,
          address_1: this.addressForm.value.addressLine1,
          address_2: this.addressForm.value.addressLine2,
          city: this.addressForm.value.city,
          state: this.addressForm.value.state,
          country: this.addressForm.value.country,
          pincode: this.addressForm.value.pincode,
          landmark: this.addressForm.value.landmark
        };
        this.shippingAddress.addAddress(addressObj).subscribe(
          (data: any) => {
            if (data) {
              this.snackBar.open("Address added successfully!", "Close", {
                duration: SNACK_BAR_DURATION
              });
              this.addressForm.reset();
              this.showAddressFields = false;
              this.getShippingAddress(this.shippingAddressId);
            }
          },
          (error: any) => {
            let errorMessage =
              error.message || "Unable to add address, please try again";
            this.snackBar.open(errorMessage, "Close", {
              panelClass: "snack-error-message",
              duration: SNACK_BAR_DURATION
            });
          }
        );
      }
    } else if (this.event === "edit_address") {
      if (this.addressForm.valid) {
        const addressObj = {
          address_id: this.shippingAddressId,
          element_id: this.addressForm.value.elementId,
          address_1: this.addressForm.value.addressLine1,
          address_2: this.addressForm.value.addressLine2,
          city: this.addressForm.value.city,
          state: this.addressForm.value.state,
          country: this.addressForm.value.country,
          pincode: this.addressForm.value.pincode,
          landmark: this.addressForm.value.landmark
        };

        this.shippingAddress.updateAddress(addressObj).subscribe(
          (data: any) => {
            if (data) {
              this.snackBar.open("Address updated successfully!", "Close", {
                duration: SNACK_BAR_DURATION
              });
              this.addressForm.reset();
              this.showAddressFields = false;
              this.getShippingAddress(this.shippingAddressId);
            }
          },
          (error: any) => {
            let errorMessage =
              error.message || "Unable to update address, please try again";
            this.snackBar.open(errorMessage, "Close", {
              panelClass: "snack-error-message",
              duration: SNACK_BAR_DURATION
            });
          }
        );
      }
    }
  }

  addAddressShowDialogBox() {
    this.showAddressFields = true;
    this.event = "add_address";
    this.addressForm.reset();
  }

  closeAddress() {
    this.showAddressFields = false;
    this.addressForm.reset();
  }

  clearAddress() {
    this.addressForm.reset();
  }

  editAddress(address: any) {
    this.addressForm.patchValue({
      id: address.id,
      addressLine1: address.address_1,
      addressLine2: address.address_2,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      landmark: address.landmark,
      elementId: address.element_id
    });
    this.showAddressFields = true;
    this.selectedAddress = null;
    this.event = "edit_address";
  }

  deleteAddress(address: any) {
    if (address) {
      this.shippingAddress
        .deleteAddress(this.shippingAddressId, address.element_id)
        .subscribe(
          (data: any) => {
            if (data) {
              this.snackBar.open("Address deleted successfully!", "Close", {
                duration: SNACK_BAR_DURATION
              });
              this.selectedAddress = null;
              this.showAddressFields = false;
              this.getShippingAddress(this.shippingAddressId);
            }
          },
          (error: any) => {
            let errorMessage =
              error.message || "Unable to update address, please try again";
            this.snackBar.open(errorMessage, "Close", {
              panelClass: "snack-error-message",
              duration: SNACK_BAR_DURATION
            });
          }
        );
    }
  }

  onSelectAddress(address: any) {
    this.selectedAddress = address;
  }

  getShippingAddress(addressId: any) {
    this.shippingAddress.getAddress(addressId).subscribe(
      (data: any) => {
        if (data && data.data && data.data.addresses) {
          this.addressList = data.data.addresses;
        }
      },
      (error: any) => {
        let errorMessage = error.message || "No Address found";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
  }

  continueToPayment() {
    if (this.selectedAddress) {
      this.stepper.selected.completed = true;
      this.stepper.next();
    }
  }
  //Address sections end here
}
