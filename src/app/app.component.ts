import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { LoadService } from './services/load.service';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './store/auth/auth.selectors';
import { getUser } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  private loadingSubscription!: Subscription;

  isLoading$ = this.loadService.loader$;

  constructor(
    private loadService: LoadService,
    private store: Store,
    ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);

    const token  = localStorage.getItem('token');
    if(token) {
      this.store.dispatch(getUser({ token }));
    }
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.loadingSubscription = this.loadService.loader$.subscribe(
  //       isLoading => {
  //         this.isLoading = isLoading;
  //       }
  //     );
  //   }, 0);
  // }
  // ngOnDestroy(): void {
  //   this.loadingSubscription.unsubscribe();
  // }

}
