import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { LoadService } from './services/load.service';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  public isAuthenticated$!: Observable<boolean>;
  private loadingSubscription!: Subscription;

  isLoading = false;

  constructor(
    private loadService: LoadService,
    private store: Store,
    ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngAfterViewInit(): void {
    this.loadingSubscription = this.loadService.loader$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
