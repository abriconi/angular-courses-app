import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseInfoComponent } from './course-info.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaComponent } from '../../shared/components/textarea/textarea.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { CourseService } from 'src/app/services/course.service';
import { of } from 'rxjs';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

describe('CourseInfoComponent', () => {
  let component: CourseInfoComponent;
  let fixture: ComponentFixture<CourseInfoComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
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

  const coursesMockedData: COURSE_MODEL[] = [
    {
    "id": 8693,
    "name": "duis mollit reprehenderit ad",
    "description": "Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.",
    "isTopRated": false,
    "date": "2017-09-28T04:39:24+00:00",
    "authors": [
      {
        "id": 1370,
        "name": "Polly",
        "lastName": "Sosa"
      }
    ],
    "length": 157
  },
  {
    "id": 4980,
    "name": "magna excepteur aute deserunt",
    "description": "Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.",
    "isTopRated": false,
    "date": "2016-05-31T02:02:36+00:00",
    "authors": [
      {
        "id": 8413,
        "name": "Greta",
        "lastName": "Richardson"
      },
      {
        "id": 7458,
        "name": "Deana",
        "lastName": "Bruce"
      },
      {
        "id": 5508,
        "name": "Patsy",
        "lastName": "Bright"
      }
    ],
    "length": 207
    },
    {
      "id": 4282,
      "name": "sit voluptate eiusmod ea",
      "description": "Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.",
      "isTopRated": true,
      "date": "2017-03-25T12:57:37+00:00",
      "authors": [
        {
          "id": 3618,
          "name": "Laura",
          "lastName": "Kirby"
        },
        {
          "id": 9064,
          "name": "Quinn",
          "lastName": "Cain"
        }
      ],
      "length": 197
    },
];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when cancelCreating is called', () => {
    component.courseForm.patchValue({
      name: 'Test Title',
      description: 'Test Description',
      length: '60',
      date: '2023-06-16',
      authors: 'John Doe',
    });
    component.cancelCreating();
    expect(component.courseForm.controls['name'].value).toBe(null);
    expect(component.courseForm.controls['description'].value).toBe(null);
    expect(component.courseForm.controls['length'].value).toBe(null);
    expect(component.courseForm.controls['date'].value).toBe(null);
    expect(component.courseForm.controls['authors'].value).toBe(null);
  });

  it('should create new course', () => {
    spyOn(component.courseCreated, 'emit');
    spyOn(courseService, 'courseCreated').and.callThrough();

    const newCourseData= {
      name: 'Test Title',
      description: 'Test Description',
      length: 60,
      date: '2023-06-16',
      authors: [
        {
          id: 3618,
          name: 'Laura',
          lastName: 'Kirby',
        },
      ],
      id: 0,
      topRated: false
    };
    const createdCourse = courseService.courseCreated(newCourseData);
    component.courseCreated.emit(createdCourse);

    component.createCourse(new Event('submit'));
    expect(component.courseCreated.emit).toHaveBeenCalledTimes(1);
  });
});
