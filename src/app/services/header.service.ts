import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  setCount = new Subject<String>();
  setCategory = new Subject<String>();

  constructor() { }
}
