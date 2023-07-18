import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseInfoComponent } from './course-info.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaComponent } from '../../shared/components/textarea/textarea.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createCourse } from 'src/app/store/courses/courses.actions';
import { of } from 'rxjs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


describe('CourseInfoComponent', () => {
  let component: CourseInfoComponent;
  let fixture: ComponentFixture<CourseInfoComponent>;
  let router: Router;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NgMultiSelectDropDownModule],
      declarations: [
        CourseInfoComponent,
        InputComponent,
        TextareaComponent,
        DurationPipe,
        ButtonComponent,
      ],
      providers: [
        provideMockStore(),
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
          useFactory: () => jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: Store,
          useClass: MockStore,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseInfoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when cancelCreating is called', () => {
    component.courseForm.patchValue({
      name: 'Test Title',
      description: 'Test Description',
      length: '60',
      date: '2023-06-16',
      authors: [new FormControl({ item_id: '3618', item_text: 'Laura Kirby' })] as any,
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
    const storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    const newCourseData = {
      name: 'Test Title',
      description: 'Test Description',
      length: 60,
      date: '2017-09-28',
      authors: [{ item_id: '3618', item_text: 'Laura Kirby' }] as any,
    };

    component.courseForm.patchValue(newCourseData as any);

    component.createCourse(new Event('submit'));

    expect(storeDispatchSpy).toHaveBeenCalledWith(
      createCourse({ newCourse: {
        name: 'Test Title',
        description: 'Test Description',
        length: 60,
        date: '2017-09-28',
        authors: [{ id: '3618', name: 'Laura Kirby' }] as any,
      } })
    );
  });
});
