import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { SectionComponent } from '../courses/section/section.component';
import { SharedModule } from '../../shared/shared.module';
import { Course } from 'src/app/utilus/global.moduls';

const coursesMockedData: Course[] = [
  {
    id: '123',
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2020',
    duration: '88',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
  },
  {
    id: '345',
    title: 'Video Course 2. Name tag',
    creationDate: '08/28/2020',
    duration: '105',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
  },
  {
    id: '456',
    title: 'Video Course 3. Name tag',
    creationDate: '08/28/2020',
    duration: '94',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit est aliquam. Obcaecati incidunt pariatur excepturi eum aliquam laborum dolorem eligendi! Facere tenetur voluptatibus, atque eveniet mollitia perferendis dolores qui.'
  }
]

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesComponent, SectionComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize courses with mocked data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.courses).toEqual(coursesMockedData);
  });

  it('should log "Button "Load more" clicked" when loadMoreClick is called', () => {
    const consoleSpy = spyOn(console, 'log');
    component.loadMoreClick();
    expect(consoleSpy).toHaveBeenCalledWith('Button "Load more" cliked');
  });

  it('should log the deleted course ID when logDeletedCourse is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const courseId = '12345';
    component.logDeletedCourse(courseId);
    expect(consoleSpy).toHaveBeenCalledWith(`Deleted course ID: ${courseId}`);
  });
});
