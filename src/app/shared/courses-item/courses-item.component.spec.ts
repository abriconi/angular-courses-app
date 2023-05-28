import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesItemComponent } from './courses-item.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent
  let fixture: ComponentFixture<CoursesItemComponent>

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [CoursesItemComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(CoursesItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should format course duration correctly', () => {
    const durationMinutes = '88';
    const formattedDuration = component.formatDuration(durationMinutes);
    expect(formattedDuration).toEqual('1h 28min')
  })

  it('should return "0min" for duration of 0 minutes', () => {
    const durationMinutes = '0';
    const formattedDuration = component.formatDuration(durationMinutes);
    expect(formattedDuration).toEqual('0min');
  });

  it('should log the value with course ID when handleEdit is called', () => {
    spyOn(console, 'log');
    const courseId = '123';
    component.handleEdit(courseId);
    expect(console.log).toHaveBeenCalledWith(`Button "Edit" cliked on course ${courseId}`);
  });

  it('should emit the course ID when deleteClick is called', () => {
    spyOn(component.deleteCourse, 'emit');
    const courseId = '123';
    component.deleteClick(courseId);
    expect(component.deleteCourse.emit).toHaveBeenCalledWith(courseId);
  });
})

