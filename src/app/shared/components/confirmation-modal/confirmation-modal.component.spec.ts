import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { By } from '@angular/platform-browser';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent, ButtonComponent, IconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal event when onCloseModal is called', () => {
    const closeModalSpy = spyOn(component.closeModal, 'emit');
    component.onCloseModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });


  it('should emit closeModal and handleDelete events when onConfirm is called', () => {
    const closeModalSpy = spyOn(component.closeModal, 'emit');
    const handleDeleteSpy = spyOn(component.handleDelete, 'emit');
    component.onConfirm();
    expect(closeModalSpy).toHaveBeenCalled();
    expect(handleDeleteSpy).toHaveBeenCalled();
  });

  it('should render course name in the modal description', () => {
    const courseName = 'Mathematics';
    component.courseName = courseName;
    fixture.detectChanges();
    const modalDescription = fixture.debugElement.query(By.css('.modalDescription')).nativeElement;
    expect(modalDescription.textContent).toContain(courseName);
  });

  it('should trigger onCloseModal when close button is clicked', () => {
    const closeButton = fixture.debugElement.query(By.css('.btnWrapper app-button'));
    const onCloseModalSpy = spyOn(component, 'onCloseModal');
    closeButton.triggerEventHandler('click', null);
    expect(onCloseModalSpy).toHaveBeenCalled();
  });

  it('should trigger onCloseModal when cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('.buttonWrapper app-button:first-child'));
    const onCloseModalSpy = spyOn(component, 'onCloseModal');
    cancelButton.triggerEventHandler('click', null);
    expect(onCloseModalSpy).toHaveBeenCalled();
  });

  it('should trigger onConfirm when delete button is clicked', () => {
    const deleteButton = fixture.debugElement.query(By.css('.buttonWrapper app-button:last-child'));
    const onConfirmSpy = spyOn(component, 'onConfirm');
    deleteButton.triggerEventHandler('click', null);
    expect(onConfirmSpy).toHaveBeenCalled();
  });
});
