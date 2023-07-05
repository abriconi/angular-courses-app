import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadService } from './services/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,  AfterViewInit {

  public isAuthenticated$!: Observable<boolean>
  isLoading = false;
  constructor(
    private authService: AuthService,
    private loadService: LoadService,
    ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$.asObservable();

  }
  ngAfterViewInit(): void {
    this.loadService.loader$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

}
