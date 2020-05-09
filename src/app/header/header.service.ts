import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeaderService {
  filter: boolean;
  private filterStatusListener = new Subject<boolean>();

  constructor(private router: Router) {
    this.filter = false;
  }

  reset() {
    this.filter = false;
    this.filterStatusListener.next(false);
  }

  onManage() {
    this.filter = true;
    this.filterStatusListener.next(true);
  }

  getFilterStatus() {
    return this.filter;
  }

  getFilterStatusListener() {
    return this.filterStatusListener.asObservable();
  }
}
