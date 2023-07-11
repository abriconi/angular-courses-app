import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AuthService } from 'src/app/services/auth.service';
import { IfAuthenticatedDirective } from '../../shared/directives/ifAuthenticated/if-authenticated.directive';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/utilus/global.moduls';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
         HeaderComponent,
         LogoComponent,
         ButtonComponent,
         IconComponent,
         IfAuthenticatedDirective
        ],
      providers: [AuthService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    const req = httpTestingController.expectOne('http://localhost:3004/auth/userinfo');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

    const mockUser: User = {
      id: 1,
      token: 'abc123',
      name: {
        first: 'John',
        last: 'Doe'
      },
      login: 'johndoe',
      password: 'password'
    };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user login name when authenticated', () => {
    authService.isAuthenticated$.next(true);
    authService.userSubject.next(mockUser);
    fixture.detectChanges();

    const userNameWrapper = fixture.debugElement.query(By.css('.userLogin'));

    expect(userNameWrapper).not.toBeNull();

    if (userNameWrapper) {
      expect(userNameWrapper.nativeElement.textContent).toContain(mockUser.login);
    }
  });

  it('should logout the user', () => {
    spyOn(authService, 'logout');
    spyOn(router, 'navigate');

    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    expect(component.user).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
