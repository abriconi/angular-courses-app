import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { By } from '@angular/platform-browser';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let router: Router;
  let routerNavigate: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent, ButtonComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerNavigate = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on button click', fakeAsync(() => {
    const buttonComponent = fixture.debugElement.query(By.directive(ButtonComponent));
    const buttonElement = buttonComponent.query(By.css('button')).nativeElement;

    buttonElement.click();

    expect(routerNavigate).toHaveBeenCalledWith(['/courses']);
  }));
});
