import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesItemComponent } from './courses-item.component';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesItemComponent, ButtonComponent, IconComponent, DurationPipe, ConfirmationModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the course ID when handleEdit is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const courseId = '12345';
    component.handleEdit(courseId);

    expect(consoleSpy).toHaveBeenCalledWith(`Button "Edit" clicked on course ${courseId}`);
  });

});
