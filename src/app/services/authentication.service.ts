import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl = environment.serverUrl + 'user/register';
  private loginUrl = environment.serverUrl + 'user/login';

  constructor(private apiService: ApiService) { }

  // register(userForm:any):Observable<any> {
  //   return this.apiService.post(this.registerUrl, userForm);
  // }

  register(userForm: any) {
    return of({ "status": "pass", "ver": "1.0.0", "message": "Successfully Created", "data": { "user_id": 6 } });
  }

  login(userForm: any): Observable<any> {
    return this.apiService.post(this.loginUrl, userForm);
  }
}
