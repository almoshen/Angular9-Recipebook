import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private timer;

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, username: string, firstname: string, lastname: string) {
    const userData = {email, password, username, firstname, lastname};
    this.http.post('http://localhost:8080/users/signup', userData)
      .subscribe(response => console.log(response));
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post<{token: string; expiresIn: number}>('http://localhost:8080/users/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expireTime = response.expiresIn;
          this.setAuthTimer(expireTime);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const date = new Date();
          const expiration = new Date(date.getTime() + expireTime * 1000);
          this.saveAuthData(token, expiration);
          this.router.navigate(['/']);
        }
      });
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expire');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expiration: new Date(expiration)
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
    clearTimeout(this.timer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expiration: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expire', expiration.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }

}
