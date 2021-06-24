import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private verifyUserUrl = environment.serverUrl + "v1/user/activation";
  private resetUrl = environment.serverUrl + 'v1/reset/password';
  constructor(private apiService: ApiService) {}

  verifyUser(params: any): Observable<any> {
    return this.apiService.get(this.verifyUserUrl, params);
  }

  resetPassword(body: any): Observable<any> {
    return this.apiService.post(this.resetUrl, body);
  }
}
