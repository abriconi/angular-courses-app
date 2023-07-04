import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: User | null;
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser();
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
