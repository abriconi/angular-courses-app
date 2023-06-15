import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesItemComponent } from './courses-item.component';
import { Course } from 'src/app/utilus/global.moduls';
import { By } from '@angular/platform-browser';
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

  it('should show modal when delete button is clicked', () => {
    component.courseData = { id: '12345' } as Course;
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('[testID="deleteCourse"]'));
    deleteButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('app-confirmation-modal'));
    expect(modal).toBeTruthy();
  });

  it('should close confirmation modal when closeModal is called', () => {
    component.courseData = { id: '12345' } as Course;
    component.showConfirmationModal = true;
    fixture.detectChanges();

    component.closeModal();
    fixture.detectChanges();

    const confirmationModal = fixture.nativeElement.querySelector('app-confirmation-modal');
    expect(confirmationModal).toBeFalsy();
  });

  it('should log the course ID when handleEdit is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const courseId = '12345';
    component.handleEdit(courseId);

    expect(consoleSpy).toHaveBeenCalledWith(`Button "Edit" clicked on course ${courseId}`);
  });

});
