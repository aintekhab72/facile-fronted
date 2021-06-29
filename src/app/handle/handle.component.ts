import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyService } from '../services/verify.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss']
})
export class HandleComponent implements OnInit {
  public sub:any;
  public showEvent = 'init';

  constructor(private route:ActivatedRoute, private verifyService:VerifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      setTimeout(() => {
        this.activateUser(id);
      }, 3000);
    });
  }

  activateUser(verifyId:any) {
    const params = new HttpParams().set('user_id', verifyId);
    this.verifyService.verifyUser(params).subscribe(
      (data: any) => {
        if (data && data.data) {
          this.showEvent = 'success';
        }
      },
      (error: any) => {
        this.showEvent = 'fail';
      }
    );
  }

  signIn() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accesstoken');
    this.router.navigate(['/auth'])
  }

}
