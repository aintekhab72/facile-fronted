import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACK_BAR_DURATION } from "src/app/utils/constants.utils";
import { Router } from "@angular/router";
import { HttpParams } from '@angular/common/http';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public userId:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  login() {
    if (this.loginForm.valid) {
      let body = {
        userId: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.login(body).subscribe(
        (data: any) => {
          if (data && data.data) {
            let token = data.data.token;
            localStorage.setItem("accesstoken", token);
            // this.router.navigate(["/"]);
            this.userId = data.data.userId;
            this.getUserInfo();
          }
        },
        (error: any) => {
          let errorMessage = error.message || "Invalid Credentials";
          this.snackBar.open(errorMessage, "Close", {
            panelClass: "snack-error-message",
            duration: SNACK_BAR_DURATION
          });
        }
      );
    }
  }

  getUserInfo() {
    let params = new HttpParams().set('user_id', this.userId);
    this.authService.userInfo(params).subscribe(
      (data: any) => {
        if (data && data.data) {
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          this.router.navigate(["/"]);
        }
      },
      (error: any) => {
        let errorMessage = error.message || "Unable to get user information";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
  }
}
