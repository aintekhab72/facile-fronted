import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderVisibility = new BehaviorSubject(false);

  constructor() { }

  getLoader() {
    return this.loaderVisibility;
  }
  /**
   * @desc To toggle the loader visibility
   * @param  {boolean} flag
   */
  toggleLoader(flag:boolean) {
    this.loaderVisibility.next(flag);
  }
}
