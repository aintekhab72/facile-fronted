import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public isLogin: boolean = true;
  public isSignup: boolean = false;
  public selectedIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

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

}
