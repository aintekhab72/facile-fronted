import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private productsList = environment.serverUrl + "v1/products";

  constructor(private apiService: ApiService) {}

  getProducts(params: any): Observable<any> {
    return this.apiService.get(this.productsList, params);
  }

  getProductDetailsById(params: any): Observable<any> {
    return this.apiService.get(this.productsList, params);
  }
}
