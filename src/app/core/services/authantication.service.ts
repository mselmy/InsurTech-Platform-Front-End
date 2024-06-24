import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor() {}

  login(role: string): void {
    this.isLoggedInSubject.next(true);
    this.userRoleSubject.next(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    this.isLoggedInSubject.next(isLoggedIn);
    this.userRoleSubject.next(userRole);
  }
}
