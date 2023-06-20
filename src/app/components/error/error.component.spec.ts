import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { By } from '@angular/platform-browser';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent, ButtonComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to home on button click', fakeAsync(() => {
  //   spyOn(component, 'homeReturn');
  //   const button = fixture.debugElement.query(By.css('[testid="homeRedirect"]')).nativeElement;

  //   button.click();
  //   tick();

  //   expect(component.homeReturn).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalledWith(['/courses'], { skipLocationChange: true });
  // }));
});
