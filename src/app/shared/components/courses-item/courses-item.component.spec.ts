// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CoursesItemComponent } from './courses-item.component';
// import { Course } from 'src/app/utilus/global.moduls';

// describe('CoursesItemComponent', () => {
//   let component: CoursesItemComponent;
//   let fixture: ComponentFixture<CoursesItemComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CoursesItemComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CoursesItemComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should emit deleteCourse event when delete button is clicked', () => {
//   //   spyOn(component.deleteCourse, 'emit');
//   //   const courseId = '12345';
//   //   component.courseData = { id: courseId } as Course;
//   //   fixture.detectChanges();

//   //   const deleteButton = fixture.nativeElement.querySelector('.editArea app-button:last-child');
//   //   deleteButton.click();

//   //   expect(component.deleteCourse.emit).toHaveBeenCalledWith(courseId);
//   // });

//   // it('should show confirmation modal when delete button is clicked', () => {
//   //   component.courseData = { id: '12345' } as Course;
//   //   fixture.detectChanges();

//   //   const deleteButton = fixture.nativeElement.querySelector('.editArea app-button:last-child');
//   //   deleteButton.click();
//   //   fixture.detectChanges();

//   //   const confirmationModal = fixture.nativeElement.querySelector('app-confirmation-modal');
//   //   expect(confirmationModal).toBeTruthy();
//   // });

//   // it('should close confirmation modal when closeModal is called', () => {
//   //   component.courseData = { id: '12345' } as Course;
//   //   component.showConfirmationModal = true;
//   //   fixture.detectChanges();

//   //   component.closeModal();
//   //   fixture.detectChanges();

//   //   const confirmationModal = fixture.nativeElement.querySelector('app-confirmation-modal');
//   //   expect(confirmationModal).toBeFalsy();
//   // });
// });
