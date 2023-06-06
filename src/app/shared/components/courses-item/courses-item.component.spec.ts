import { TestBed } from '@angular/core/testing';
import { CoursesItemComponent } from './courses-item.component';
import { SharedModule } from '../../shared.module';
import { DurationPipe } from '../../pipes/duration.pipe';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let pipe: DurationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesItemComponent],
      imports: [SharedModule],
      providers: [DurationPipe]
    });
    pipe = TestBed.inject(DurationPipe);
  });

  it('should format course duration correctly', () => {
    component = TestBed.createComponent(CoursesItemComponent).componentInstance;
    const durationMinutes = '88';
    const formattedDuration = pipe.transform(durationMinutes);
    expect(formattedDuration).toEqual('1h 28min');
  });

  it('should return "0min" for duration of 0 minutes', () => {
    component = TestBed.createComponent(CoursesItemComponent).componentInstance;
    const durationMinutes = '0';
    const formattedDuration = pipe.transform(durationMinutes);
    expect(formattedDuration).toEqual('0min');
  });

  it('should log the message with course ID when handleEdit is called', () => {
    component = TestBed.createComponent(CoursesItemComponent).componentInstance;
    spyOn(console, 'log');
    const courseId = '123';
    component.handleEdit(courseId);
    expect(console.log).toHaveBeenCalledWith(`Button "Edit" clicked on course ${courseId}`);
  });

  it('should emit the course ID when deleteClick is called', () => {
    component = TestBed.createComponent(CoursesItemComponent).componentInstance;
    spyOn(component.deleteCourse, 'emit');
    const courseId = '123';
    component.deleteClick(courseId);
    expect(component.deleteCourse.emit).toHaveBeenCalledWith(courseId);
  });
});
