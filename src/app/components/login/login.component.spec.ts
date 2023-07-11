import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, ButtonComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize userForm with empty fields', () => {
    const loginControl = component.userForm.get('login');
    const passwordControl = component.userForm.get('password');

    expect(loginControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
  });

  it('should display error message when userForm is invalid and isError is true', () => {
    component.isError = true;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.errorMessage');
    expect(errorMessage.textContent).toContain('Wrong e-mail or password');
  });

  it('should not display error message when userForm is valid', () => {
    const errorMessage = fixture.nativeElement.querySelector('.errorMessage');
    expect(errorMessage).toBeFalsy();
  });

  it('should call login method on form submit', () => {
    spyOn(component, 'login');
    const loginForm = fixture.nativeElement.querySelector('.userLoginForm');
    loginForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.login).toHaveBeenCalled();
  });

  it('form invalid, when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should call login method and pass form values on form submit', () => {
    const login = component.userForm.get('login');
    const password = component.userForm.get('password');
    login?.setValue('flastname');
    password?.setValue('flastname');

    spyOn(authService, 'login');
    spyOn(component, 'login').and.callThrough();

    const event = new Event('submit');
    component.login(event);

    expect(component.login).toHaveBeenCalledWith(event);
    expect(authService.login).toHaveBeenCalledWith('flastname', 'flastname');
  });
});
