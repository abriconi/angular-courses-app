import { CoursesItemComponent } from './courses-item.component';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent

  beforeEach(() => {
    component = new CoursesItemComponent();
  });

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

  it('should log the messege with course ID when handleEdit is called', () => {
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

