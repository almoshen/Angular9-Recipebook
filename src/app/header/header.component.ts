import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authListenerSub: Subscription;

  constructor( private authService: AuthService) { }

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

}
