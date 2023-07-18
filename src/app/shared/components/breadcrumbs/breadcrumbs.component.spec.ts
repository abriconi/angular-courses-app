import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCourse } from 'src/app/store/courses/courses.selectors';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;
  let store: MockStore;
  let selectMockCourseSelector: MemoizedSelector<any, any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore(),],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store) as MockStore;
    selectMockCourseSelector = store.overrideSelector(selectCourse, { name: 'Course Title' });

    const navigationEndEvent = new NavigationEnd(1, '/courses/1', '/courses/1');
    (router.events as any).next(navigationEndEvent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
