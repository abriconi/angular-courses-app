import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: User | null;
  private userSubscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select((selectUser)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(logout());
    this.user = null;
    this.router.navigate(['/login']);
  }
}
