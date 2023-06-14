import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/utilus/global.moduls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'fakeToken';
  private user: UserLogin | null = null;

  login(login: string, password: string): void {
    this.user = {
      login: login,
      password: password,
      token: this.token
    };
    console.log('this user in service on login', this.user);
    console.log(`${this.user.login} logged in succesfully`);


    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout(): void {
    if(this.user) {
      console.log(`${this.user.login} logged out succesfully`);
    }

    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  getUserInfo(): UserLogin | null {
    return this.user;
  }
}
