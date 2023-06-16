import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, ButtonComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
