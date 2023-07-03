import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: null | string = localStorage.getItem('token');

  userSubject = new BehaviorSubject<UserLogin | null>(null);
  isAuthenticated$ = this.token ? new BehaviorSubject<boolean>(true) : new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();

  constructor (
    private http: HttpClient,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    return this.token? true : false;
  }

  login(login: string, password: string): void {
    const loginData = {
      login: login,
      password: password,
    }

    this.http.post<UserLogin>('http://localhost:3004/auth/login', loginData)
      .subscribe((data) => {
        const userData = {
          login: login,
          password: password,
          token: data.token
        };
        this.isAuthenticated$.next(true);
        localStorage.setItem('token', data.token);
        this.userSubject.next(userData);

        this.router.navigate(['/courses']);
      })
  }
  logout(): void {
    this.token = null;
    this.isAuthenticated$.next(false);

    localStorage.removeItem('token');;
  }
}
