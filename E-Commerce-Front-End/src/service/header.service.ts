// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To reload header after updating information

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private reloadHeader = new Subject<void>();

  reloadHeader$ = this.reloadHeader.asObservable();

  triggerReload() {
    this.reloadHeader.next();
  }

  constructor() { }
}
