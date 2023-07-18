import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/utilus/global.moduls';
import { Observable, of } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$:Observable<User | null> = of(null);

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select((selectUser))
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}


