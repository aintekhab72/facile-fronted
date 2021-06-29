import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ForgotPasswordDialogComponent } from "../shared/forgot-password-dialog/forgot-password-dialog.component";
import { CustomDialogComponent } from '../shared/custom-dialog/custom-dialog.component';

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"]
})
export class AuthenticationComponent implements OnInit {
  public isLogin: boolean = true;
  public isSignup: boolean = false;
  public selectedIndex: number = 0;
  public showForgotPassword: boolean = false;
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  selectTab(event: any) {
    this.isLogin = false;
    this.isSignup = false;
    if (event.index === 0) {
      this.isLogin = true;
      this.selectedIndex = 0;
    } else {
      this.isSignup = true;
      this.selectedIndex = 1;
    }
  }

  redirectTo(num: any) {
    this.isLogin = false;
    this.isSignup = false;
    if (num === 0) {
      this.isLogin = true;
      this.selectedIndex = 0;
    } else {
      this.isSignup = true;
      this.selectedIndex = 1;
    }
  }

  forgotPasswordInit() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      panelClass: "dialog-container-custom"
    });

    dialogRef.afterClosed().subscribe(result => {
      const response = dialogRef.componentInstance.success;
      if(response) {
        const customDialogRef = this.dialog.open(CustomDialogComponent, {
          data: {
            state: 'forgot-init-success'
          },
          panelClass: "dialog-container-custom"
        });
        customDialogRef.afterClosed().subscribe(result => {
        });
      }
    });
  }
}
