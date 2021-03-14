import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CART } from '../services/mock.response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems:any;
  public firstFormGroup!: FormGroup;
  public secondFormGroup!: FormGroup;
  isEditable = false;

  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    //Read cart items from local storage 
    let carts:any = localStorage.getItem('cartItems');
    let productList:any = JSON.parse(carts);
    if(productList) {
      this.cartItems = productList.items
    } else {
      this.cartItems = []
    }
  }

  removeItems(cart:any) {
    let cartItems = localStorage.getItem('cartItems');
    if(cartItems) {
      //remove items
      let productList:any = JSON.parse(cartItems)
      const data = productList.items.filter((item:any) => item.id !== cart.id);
      let prepartCartObj = {
        items: data
      }
      localStorage.setItem('cartItems', JSON.stringify(prepartCartObj));

      //Get items 
      let carts:any = localStorage.getItem('cartItems');
      let updatedList:any = JSON.parse(carts);
      if(updatedList) {
        this.cartItems = updatedList.items
      } else {
        this.cartItems = []
      }
      this.snackBar.open('Product removed from your cart successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }

}
