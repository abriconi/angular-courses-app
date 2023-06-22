import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CoursesItemComponent } from './courses-item.component';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;
  let router: Router;
  let routerNavigate: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [CoursesItemComponent, ButtonComponent, IconComponent, DurationPipe, ConfirmationModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerNavigate = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the course when handleEdit is called', () => {
    const courseId = '12345';
    component.handleEdit(courseId);

    expect(routerNavigate).toHaveBeenCalledWith([ '/courses', courseId ]);
  });

});
