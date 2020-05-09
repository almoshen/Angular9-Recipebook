import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.API_URL + '/users';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private userId: string;
  private timer;

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, username: string, firstname: string, lastname: string) {
    const userData = {email, password, username, firstname, lastname};
    this.http.post(BACKEND_URL + '/signup', userData)
      .subscribe(() => {
          this.router.navigate(['/']);
        },
        error => {
          this.authStatusListener.next(false);
        });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post<{token: string; expiresIn: number, userId:string}>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expireTime = response.expiresIn;
          this.setAuthTimer(expireTime);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const date = new Date();
          const expiration = new Date(date.getTime() + expireTime * 1000);
          this.saveAuthData(token, expiration, this.userId);
          this.router.navigate(['/']);
        }
      });
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expire');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expiration: new Date(expiration),
      userId
    };
  }

   authUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const date = new Date();
    const expireTime = authInfo.expiration.getTime() - date.getTime();
    if (expireTime > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expireTime / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.timer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expiration: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expire', expiration.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }

}
