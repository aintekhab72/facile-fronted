import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private categories = environment.serverUrl + "v1/categories";

  constructor(private apiService: ApiService) {}

  getCategories(): Observable<any> {
    return this.apiService.get(this.categories);
  }
}
