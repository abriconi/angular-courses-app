import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LogoComponent } from './logo.component';


class MockAuthGuard {
  canActivate(): boolean {
    return true;
  }
}

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let router: Router;
  let navigateByUrlSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [LogoComponent],
      providers: [
        { provide: AuthGuard, useClass: MockAuthGuard }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to courses page on logo click', fakeAsync(() => {
    const logoLink = fixture.nativeElement.querySelector('.nav-home');

    logoLink.click();

    expect(navigateByUrlSpy).toHaveBeenCalledWith(jasmine.stringMatching('/courses'), jasmine.any(Object));
  }));
});
