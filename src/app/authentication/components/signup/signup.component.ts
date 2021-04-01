import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoaderService } from "src/app/services/loader.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { SNACK_BAR_DURATION } from 'src/app/utils/constants.utils';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  public isvalidPassword: boolean = false;
  hide = true;
  public isValidEmail: boolean = false;
  public isValidMobile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        firstName: new FormControl("", [
          Validators.required,
          Validators.minLength(3)
        ]),
        middleName: new FormControl(""),
        lastName: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
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
        mobile: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[6-9]\d{9}$/)
        ])
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

  signUp() {
    if (this.signUpForm.valid && this.isValidEmail && this.isValidMobile) {
      let body = {
        name:
          this.signUpForm.value.firstName +
          " " +
          this.signUpForm.value.middleName +
          " " +
          this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        mobile: this.signUpForm.value.mobile,
        password: this.signUpForm.value.password
      };

      this.authService.register(body).subscribe(
        (data: any) => {
          if (data && data.data && data.message) {
            this.router.navigate(["/"]);
            this.snackBar.open(data.message, "Close", {
              duration: SNACK_BAR_DURATION
            });
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

  checkUniqueEmail() {
    if(this.signUpForm.value.email && this.signUpForm.controls['email'].valid) {
      let params = new HttpParams().set('email', this.signUpForm.value.email);
      this.authService.uniqueness(params).subscribe(
        (data: any) => {
          if (data && data.message && data.message == 'Email does not exist') {
            this.isValidEmail = true;
          }
        },
        (error: any) => {
          this.isValidEmail = false;
          let errorMessage = error.message || "Invalid";
          this.snackBar.open(errorMessage, "Close", {
            panelClass: "snack-error-message",
            duration: SNACK_BAR_DURATION
          });
        }
      );
    }
  }

  checkUniqueMobile() {
    if(this.signUpForm.value.mobile && this.signUpForm.controls['mobile'].valid) {
      let params = new HttpParams().set('mobile', this.signUpForm.value.mobile);
      this.authService.uniqueness(params).subscribe(
        (data: any) => {
          if (data && data.message && data.message == 'Mobile does not exist') {
            this.isValidMobile = true;
          }
        },
        (error: any) => {
          this.isValidMobile = false;
          let errorMessage = error.message || "Invalid";
          this.snackBar.open(errorMessage, "Close", {
            panelClass: "snack-error-message",
            duration: SNACK_BAR_DURATION
          });
        }
      );
    }
  }
}
