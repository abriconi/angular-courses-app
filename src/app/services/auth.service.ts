import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from 'src/app/utilus/global.moduls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: null | string = null;

  user$ = new BehaviorSubject<UserLogin | null>(null);
  isAuthenticated$ = new BehaviorSubject(false);

  constructor() {
    this.user$.subscribe((user) => {
      if (!user) {
        this.logout();
        return;
      }

      this.isAuthenticated$.next(true);
      console.log(`${user.login} logged in succesfully`);
    });

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.token = token;
      this.user$.next(JSON.stringify(user) as unknown as UserLogin)
    }
  }

  login(login: string, password: string): void {
    const userData = {
      login: login,
      password: password,
      token: 'fakeToken',
    }

    this.user$.next(userData);
    this.token = userData.token;

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
