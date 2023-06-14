import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserLogin } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: UserLogin | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserInfo();
    console.log('this.user onInit', this.user);
  }

  isLoggedIn(): boolean {
    console.log(111);

    return this.authService.isAuthenticated();
  }

  getUserName(): string {
    return this.user ? this.user.login : '';
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
  }
}
