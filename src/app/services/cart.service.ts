import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carts = environment.serverUrl + "v1/carts";

  constructor(private apiService: ApiService) {}

  getCarts(cartId: any): Observable<any> {
    return this.apiService.get(this.carts+'/'+cartId);
  }

  addCart(body:any): Observable<any> {
    return this.apiService.post(this.carts, body);
  }

  updateCart(body:any): Observable<any> {
    return this.apiService.put(this.carts, body);
  }

  deleteCart(cartId:any, cartElementId: any): Observable<any> {
    return this.apiService.delete(this.carts+'/'+ cartId + '/' +cartElementId);
  }
}
