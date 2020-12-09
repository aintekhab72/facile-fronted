import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  public isvalidPassword: boolean = false;
  hide = true;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
      middleName: new FormControl(""),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?!.*\s).{8,}$/)]],
      confirmPassword: ['', Validators.required],
      mobile: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9]\d{9}$/)])
    }, {
        validator: this.ConfirmPasswordValidator("password", "confirmPassword")
      });
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
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
    }
    else if (this.signUpForm.value.password.length > 0) {
      this.isvalidPassword = true;
      if (this.signUpForm.controls['password'].valid) {
        this.isvalidPassword = false;
      }
    }
  }


  signUp() {
    if (this.signUpForm.valid) {
      let body = {
        first_name: this.signUpForm.value.firstName,
        middle_name: this.signUpForm.value.middleName,
        last_name: this.signUpForm.value.lastName,
        mobile: this.signUpForm.value.mobile,
        password: this.signUpForm.value.password,
        email: this.signUpForm.value.email
      }
    }
  }

}
