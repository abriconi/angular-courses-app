import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseInfoComponent } from './course-info.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaComponent } from '../../shared/components/textarea/textarea.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CourseService } from 'src/app/services/course.service';
import { of } from 'rxjs';

describe('CourseInfoComponent', () => {
  let component: CourseInfoComponent;
  let fixture: ComponentFixture<CourseInfoComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        CourseInfoComponent,
        InputComponent,
        TextareaComponent,
        DurationPipe,
        ButtonComponent,
      ],
      providers: [
        CourseService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'mock-course-id',
              },
            },
            paramMap: of({
              get: () => 'mock-course-id',
            }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseInfoComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when cancelCreating is called', () => {
    component.courseForm.patchValue({
      title: 'Test Title',
      description: 'Test Description',
      duration: '60',
      creationDate: '2023-06-16',
      authors: 'John Doe',
    });
    component.cancelCreating();
    expect(component.courseForm.controls['title'].value).toBe(null);
    expect(component.courseForm.controls['description'].value).toBe(null);
    expect(component.courseForm.controls['duration'].value).toBe(null);
    expect(component.courseForm.controls['creationDate'].value).toBe(null);
    expect(component.courseForm.controls['authors'].value).toBe(null);
  });

  it('should create new course', () => {
    spyOn(component.courseCreated, 'emit');
    spyOn(courseService, 'courseCreated').and.callThrough();

    const newCourseData = {
      title: 'Test Title',
      description: 'Test Description',
      duration: '60',
      creationDate: '2023-06-16',
      authors: 'John Doe',
    };
    component.courseForm.patchValue(newCourseData);

    component.createCourse(new Event('submit'));
    expect(component.courseCreated.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Title',
        description: 'Test Description',
        duration: '60',
        creationDate: '2023-06-16',
        authors: 'John Doe',
        id: jasmine.any(String),
        topRated: jasmine.any(Boolean),
      })
    );
    const courses = courseService.getList();
    const createdCourse = courses.find((course) => course.title === newCourseData.title);
    expect(createdCourse).toBeTruthy();
  });
});
