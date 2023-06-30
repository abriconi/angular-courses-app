import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: null | string = null;

  userSubject = new BehaviorSubject<UserLogin | null>(null);
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();

  constructor (
    private http: HttpClient,
    private router: Router,
  ) {}

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
        this.userSubject.next(userData);
        this.token = data.token;
        this.isAuthenticated$.next(true);

        this.router.navigate(['/courses']);
      })
  }
  getUser() {
    this.http.post('http://localhost:3004/auth/userinfo', '')
    .subscribe((data) => {
      console.log('getUser', data); //TODO
    })
  }
  
  logout(): void {
    this.token = null;
    this.isAuthenticated$.next(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
