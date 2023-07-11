import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SectionComponent } from '../section/section.component';
import { SharedModule } from '../../../shared/shared.module';
import { CourseService } from 'src/app/services/course.service';
import { CoursesLayoutComponent } from './courses-layout.component';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

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

describe('CoursesLayoutComponent', () => {
  let component: CoursesLayoutComponent;
  let fixture: ComponentFixture<CoursesLayoutComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesLayoutComponent, SectionComponent ],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        { provide: 'coursesMockedData', useValue: coursesMockedData },
        { provide: CourseService, useClass: CourseService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesLayoutComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component', () => {
    spyOn(component, 'getCourses');

    component.ngOnInit();

    expect(component.getCourses).toHaveBeenCalled();
  });

  it('should load more courses when loadMoreClick is called', () => {
    const pageNumber = component['currentPage'] + 1;
    const searchText = component['searchText'];
    spyOn(courseService, 'getList');
    component.loadMoreClick();
    expect(courseService.getList).toHaveBeenCalledWith(pageNumber, 3, searchText);
  });

  it('should call getList method of courseService with the correct arguments on handleSearch', () => {
    spyOn(courseService, 'getList');
    const searchText = 'test search';

    component.handleSearch(searchText);

    expect(courseService.getList).toHaveBeenCalledWith(1, 3, searchText);
  });
});
