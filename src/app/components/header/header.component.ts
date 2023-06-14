import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserLogin } from 'src/app/utilus/global.moduls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: UserLogin | null = null;

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserName(): string {
    this.user = this.authService.getUserInfo();
    return this.user ? this.user.login : '';
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
  }
}
