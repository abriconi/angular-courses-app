import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from '../section/section.component';
import { SharedModule } from '../../../shared/shared.module';
import { Course } from 'src/app/utilus/global.moduls';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe';
import { CourseService } from 'src/app/services/course.service';
import { CoursesLayoutComponent } from './courses-layout.component';

const coursesMockedData: Course[] = [
  {
    id: '123',
    title: 'Video Course 1. Name tag',
    topRated: true,
    creationDate: '05/30/2023',
    duration: '88',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
  },
  {
    id: '345',
    title: 'Video Course 2. Name tag',
    topRated: true,
    creationDate: '08/28/2023',
    duration: '105',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
  },
  {
    id: '456',
    title: 'Video Course 3. Name tag',
    topRated: false,
    creationDate: '08/28/2020',
    duration: '94',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
  }
];

describe('CoursesLayoutComponent', () => {
  let component: CoursesLayoutComponent;
  let fixture: ComponentFixture<CoursesLayoutComponent>;
  let orderByPipe: OrderByPipe;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesLayoutComponent, SectionComponent ],
      imports: [SharedModule],
      providers: [
        { provide: 'coursesMockedData', useValue: coursesMockedData },
        OrderByPipe,
        { provide: CourseService, useClass: CourseService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesLayoutComponent);
    component = fixture.componentInstance;
    orderByPipe = TestBed.inject(OrderByPipe);
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log "Button "Load more" clicked" when loadMoreClick is called', () => {
    const consoleSpy = spyOn(console, 'log');
    component.loadMoreClick();
    expect(consoleSpy).toHaveBeenCalledWith('Button "Load more" cliked');
  });

  it('should delete course when deleteCourse is called', () => {
    const courses: Course[] = component.courses;
    const courseId = courses[0].id;
    const initialCourseExists = courses.some((course) => course.id === courseId);
    expect(initialCourseExists).toBeTrue();
    component.deleteCourse(courseId);
    const courseRemoved = !courses.some((course) => course.id === courseId);
    expect(courseRemoved).toBeTrue();
  });

  it('should reset courses to the full list when handleSearch is called with an empty search text', () => {
    component.courses = coursesMockedData.slice(0, 2);
    const getListSpy = spyOn(courseService, 'getList').and.returnValue(coursesMockedData);
    const sortedCourses = orderByPipe.transform(coursesMockedData);
    component.handleSearch('');
    expect(getListSpy).toHaveBeenCalled();
    expect(sortedCourses).toEqual(coursesMockedData);
  });
});