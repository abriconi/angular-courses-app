import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from 'src/app/utilus/global.moduls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: null | string = null;

  userSubject = new BehaviorSubject<UserLogin | null>(null);
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();


  login(login: string, password: string): void {
    const userData = {
      login: login,
      password: password,
      token: 'fakeToken',
    }

    this.userSubject.next(userData);
    this.token = userData.token;
    this.isAuthenticated$.next(true);

    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated$.next(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
