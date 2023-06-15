import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AuthService } from 'src/app/auth.service';
import { UserLogin } from 'src/app/utilus/global.moduls';
import { IfAuthenticatedDirective } from '../../shared/directives/ifAuthenticated/if-authenticated.directive';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LogoComponent, ButtonComponent, IconComponent, IfAuthenticatedDirective ],
      providers: [AuthService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user to null', () => {
    expect(component.user).toBeNull();
  });

  it('should display user login name when authenticated', () => {
    const testUser: UserLogin = { token: 'Fake token', login: 'testuser', password: '1' };
    authService.user$.next(testUser);
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.nav-btn-wrapper app-button'));
    expect(buttonElement.nativeElement.textContent).toContain(testUser.login);
  });

  // it('should subscribe to user$ observable on initialization', () => {
  //   spyOn(authService.user$, 'subscribe').and.returnValue(of({ token: 'Fake token', login: 'user', password: '123' }));
  //   component.ngOnInit();
  //   expect(component.user).toEqual({ id: '123', login: 'user' });
  // });

  // it('should call authService.logout() and clear user on logout', () => {
  //   spyOn(authService, 'logout');

  //   const logoutButton = fixture.debugElement.query(By.css('[testID="loginButton"]'));
  //   console.log(logoutButton);

  //   logoutButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   expect(authService.logout).toHaveBeenCalled();
  //   expect(component.user).toBeNull();
  // });
});
