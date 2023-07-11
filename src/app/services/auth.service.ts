import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserLogin } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { LoadService } from './load.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  token: null | string = localStorage.getItem('token');

  userSubject = new BehaviorSubject<User | null>(null);
  isAuthenticated$ = this.token ? new BehaviorSubject<boolean>(true) : new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();

  constructor (
    private http: HttpClient,
    private router: Router,
    private loadService: LoadService,
  ) {
    if(this.isAuthenticated$) {
      this.getUser();
    }
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    return this.token? true : false;
  }

  login(login: string, password: string): void {
    const loginData = {
      login: login,
      password: password,
    }

    this.loadService.showLoader();

    setTimeout(() => {
      this.loadService.hideLoader()
    }, 1000);

    this.http.post<UserLogin>('http://localhost:3004/auth/login', loginData)
      .subscribe((data) => {
        const userData = {
          login: login,
          password: password,
          token: data.token
        };
        this.isAuthenticated$.next(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', userData.login);

        this.getUser();

        this.router.navigate(['/courses']);
      })
  }
  getUser() {
    const token = localStorage.getItem('token');

    const body ={
      token: token
    };

    this.http.post<User | null>('http://localhost:3004/auth/userinfo', body)
      .subscribe((data) => {
        this.userSubject.next(data);
      });
  }
  logout(): void {
    this.loadService.showLoader();

    setTimeout(() => {
      this.loadService.hideLoader()
    }, 1000);
    
    this.token = null;
    this.isAuthenticated$.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
