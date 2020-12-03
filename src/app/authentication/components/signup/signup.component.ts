import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  public isvalidPassword: boolean = false;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?!.*\s).{8,}$/)]],
      confirmPassword: ['', Validators.required],
      mobile: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9]\d{9}$/)])
    });
  }

  get signUpDetails() {
    return this.signUpForm.controls;
  }

  // passwordMatchValidator(frm: FormGroup) {
  //   if(frm.controls['confirmPassword'].value.length > 0){
  //     return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  //   }
  // }

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
    if(this.signUpForm.valid) {
      console.log('signup form', this.signUpForm.value);
    }
  }

}
