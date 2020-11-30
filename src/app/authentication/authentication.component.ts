import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public signUpForm!: FormGroup;
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,  Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      newPassword: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9]\d{9}$/)])
    });

    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required,  Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl("", [Validators.required])
    });
  }

}
