import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";
import { Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACK_BAR_DURATION } from "../utils/constants.utils";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"]
})
export class MyOrdersComponent implements OnInit {
  public myOrders: any[] = [];
  public userId: string;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let userInfo: any = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      this.userId = userInfo._id;
      if (this.userId) {
        this.getMyOrders(this.userId);
      }
    } else {
      this.router.navigate(["/"]);
    }
  }

  getMyOrders(userId: any) {
    let params: HttpParams = new HttpParams().set("userId", userId);
    this.orderService.getMyOrder(params).subscribe(
      data => {
        if (data && data.data) this.myOrders = data.data;
      },
      (error: any) => {
        let errorMessage = error.message || "No Orders found";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
  }
}
