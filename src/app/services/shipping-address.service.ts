import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  private addressList = environment.serverUrl + "v1/address";

  constructor(private apiService: ApiService) {}

  getAddress(addressId: any): Observable<any> {
    return this.apiService.get(this.addressList+'/'+addressId);
  }

  addAddress(body:any): Observable<any> {
    return this.apiService.post(this.addressList, body);
  }

  updateAddress(body:any): Observable<any> {
    return this.apiService.put(this.addressList, body);
  }

  deleteAddress(addressId:any, addressElementId: any): Observable<any> {
    return this.apiService.delete(this.addressList+'/'+ addressId + '/' +addressElementId);
  }
}
