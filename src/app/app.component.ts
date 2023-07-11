import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadService } from './services/load.service';

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
    private authService: AuthService,
    private loadService: LoadService,
    ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$.asObservable();

  }
  //TODO is correct unsubscribe and subscribe?
  ngAfterViewInit(): void {
    this.loadingSubscription = this.loadService.loader$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
