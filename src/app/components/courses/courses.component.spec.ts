import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { SectionComponent } from '../courses/section/section.component';
import { SharedModule } from '../../shared/shared.module';
import { Course } from 'src/app/utilus/global.moduls';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe';
import { CourseService } from 'src/app/course.service';

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

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let orderByPipe: OrderByPipe;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent, SectionComponent],
      imports: [SharedModule],
      providers: [
        { provide: 'coursesMockedData', useValue: coursesMockedData },
        OrderByPipe,
        { provide: CourseService, useClass: CourseService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    orderByPipe = TestBed.inject(OrderByPipe);
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses with mocked data on ngOnInit', () => {
    component.ngOnInit();
    const sortedCourses = orderByPipe.transform(coursesMockedData);
    expect(component.courses).toEqual(sortedCourses);
  });

  it('should log "Button "Load more" clicked" when loadMoreClick is called', () => {
    const consoleSpy = spyOn(console, 'log');
    component.loadMoreClick();
    expect(consoleSpy).toHaveBeenCalledWith('Button "Load more" cliked');
  });

  it('should delete course when deleteCourse is called', () => {
    const courseId = '123';
    const removeItemSpy = spyOn(courseService, 'removeItem');

    component.deleteCourse(courseId);
    expect(removeItemSpy).toHaveBeenCalledWith(courseId);
  });

  it('should reset courses to the full list when handleSearch is called with an empty search text', () => {
    component.courses = coursesMockedData.slice(0, 2);
    const getListSpy = spyOn(courseService, 'getList').and.callThrough();
    const sortedCourses = orderByPipe.transform(coursesMockedData);
    component.handleSearch('');
    expect(getListSpy).toHaveBeenCalled();
    expect(component.courses).toEqual(sortedCourses);
  });

});
