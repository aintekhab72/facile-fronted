import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VerifyService } from "../services/verify.service";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../utils/constants.utils';
import { CustomDialogComponent } from '../shared/custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  public sub: any;
  public signUpForm!: FormGroup;
  public isvalidPassword: boolean = false;
  hide = true;
  public isValidEmail: boolean = false;
  public isValidMobile: boolean = false;
  public userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private verifyService: VerifyService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params["id"];
    });
    this.signUpForm = this.fb.group(
      {
        userId: new FormControl(this.userId, [Validators.required]),
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?!.*\s).{8,}$/
            )
          ]
        ],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: this.ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get signUpDetails() {
    return this.signUpForm.controls;
  }

  validPassword() {
    if (this.signUpForm.value.password.length === 0) {
      this.isvalidPassword = false;
    } else if (this.signUpForm.value.password.length > 0) {
      this.isvalidPassword = true;
      if (this.signUpForm.controls["password"].valid) {
        this.isvalidPassword = false;
      }
    }
  }

  resetPassword() {
    if (this.signUpForm.valid) {
      let body = {
        user_id:this.signUpForm.value.userId,
        password: this.signUpForm.value.password
      };

      this.verifyService.verifyUser(body).subscribe(
        (data: any) => {
          if (data && data.data && data.message) {
            this.openDialog();
          }
        },
        (error: any) => {
          let errorMessage = error.message || "Invalid";
          this.snackBar.open(errorMessage, "Close", {
            panelClass: "snack-error-message",
            duration: SNACK_BAR_DURATION
          });
        }
      );
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        state : 'reset-password-success'
      },
      panelClass: 'dialog-container-custom'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/auth"]);
    });
  }
}
