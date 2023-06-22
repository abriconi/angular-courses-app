import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CourseService } from 'src/app/services/course.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                paramMap: {
                  get: () => '1' // Mocking the course ID for testing
                }
              }
            }
          }
        },
        {
          provide: CourseService,
          useValue: {
            getItemById: () => Promise.resolve({ title: 'Course Title' }) // Mocking the course data for testing
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set courseTitle when course ID is present', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    router.events.next(new NavigationEnd(1, '/courses/1', '/courses/1'));
    await fixture.whenStable();

    expect(component.courseTitle).toBe('Course Title');
  });

  it('should set courseTitle to null when course ID is not present', async () => {
    spyOn(courseService, 'getItemById').and.returnValue(undefined);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    router.events.next(new NavigationEnd(1, '/courses', '/courses'));
    await fixture.whenStable();

    expect(component.courseTitle).toBeNull();
  });
});
