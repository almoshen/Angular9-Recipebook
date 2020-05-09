import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {HeaderService} from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authListenerSub: Subscription;

  constructor( private authService: AuthService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }

  onManage() {
    this.headerService.onManage();
  }

  reset() {
    this.headerService.reset();
  }

}
