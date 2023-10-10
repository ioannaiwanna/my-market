import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {}
  login(username: string, password: string): boolean {
    if (username === '_username' && password === '_password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }
  logout(): void {
    this.isAuthenticated = false;
  }
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
