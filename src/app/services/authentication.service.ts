import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private registerUrl = environment.serverUrl + "v1/user/register";
  private loginUrl = environment.serverUrl + "v1/user/login";
  private uniquenessUrl = environment.serverUrl + "v1/uniqueness";
  private userInfoUrl = environment.serverUrl + "v1/user/info";
  private forgotPasswordInitUrl = environment.serverUrl + "v1/verify/email";

  constructor(private apiService: ApiService) {}

  uniqueness(params:any):Observable<any> {
    return this.apiService.get(this.uniquenessUrl, params);
  }

  register(userForm: any): Observable<any> {
    return this.apiService.post(this.registerUrl, userForm);
  }

  login(userForm: any): Observable<any> {
    return this.apiService.post(this.loginUrl, userForm);
  }

  userInfo(params: any): Observable<any> {
    return this.apiService.get(this.userInfoUrl, params);
  }

  forgotPasswordInit(params:any): Observable<any> {
    return this.apiService.get(this.forgotPasswordInitUrl, params)
  }
}
