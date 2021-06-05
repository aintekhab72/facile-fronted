import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private placeOrderUrl = environment.serverUrl + "v1/orders";

  constructor(private apiService: ApiService) {}

  placeOrder(body:any): Observable<any> {
    return this.apiService.post(this.placeOrderUrl, body);
  }

}
