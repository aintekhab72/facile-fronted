import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/authentication.service";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "app-forgot-password-dialog",
  templateUrl: "./forgot-password-dialog.component.html",
  styleUrls: ["./forgot-password-dialog.component.scss"]
})
export class ForgotPasswordDialogComponent implements OnInit {
  public isValidEmail: boolean = false;
  public forgotPasswordForm!: FormGroup;
  public success: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  get signUpDetails() {
    return this.forgotPasswordForm.controls;
  }

  checkUniqueEmail() {
    if (
      this.forgotPasswordForm.value.email &&
      this.forgotPasswordForm.controls["email"].valid
    ) {
      let params = new HttpParams().set(
        "email",
        this.forgotPasswordForm.value.email
      );
      this.authService.uniqueness(params).subscribe(
        (data: any) => {
          if (data && data.message && data.message == "Email does not exist") {
            this.isValidEmail = false;
          }
        },
        (error: any) => {
          if (error && error.message && error.message == "Email exist") {
            this.isValidEmail = true;
          }
        }
      );
    }
  }

  forgotPwdInit() {
    if (this.forgotPasswordForm.value.email) {
      let params = new HttpParams().set(
        "email",
        this.forgotPasswordForm.value.email
      );
      this.authService.forgotPasswordInit(params).subscribe(
        (data: any) => {
          if (data && data.data) {
            this.success = true;
            this.dialogRef.close('ref');
          }
        },
        (error: any) => {
          this.success = false;
          this.dialogRef.close('ref');
        }
      );
    }
  }
}
