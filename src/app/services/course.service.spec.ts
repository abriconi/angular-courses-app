import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { coursesMockedData } from '../utilus/global.constans';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should return the list of courses', () => {
    const courses = service.getList();
    console.log('coursesMockedData.length 1', coursesMockedData.length);
    expect(courses).toEqual(coursesMockedData);
  });

  it('should create a new course', () => {
    const newCourseData = {
      title: 'Test Title',
      description: 'Test Description',
      duration: '60',
      creationDate: '2023-06-16',
      authors: 'John Doe',
    };

    const createdCourse = service.courseCreated(newCourseData);

    expect(createdCourse.title).toBe('Test Title');
    expect(createdCourse.description).toBe('Test Description');
    expect(createdCourse.duration).toBe('60');
    expect(createdCourse.creationDate).toBe('2023-06-16');
    expect(createdCourse.authors).toBe('John Doe');
    expect(createdCourse.topRated).toBe(false);

    const courses = service.getList();

    expect(courses.find(course => course.id === createdCourse.id)).toBeTruthy();
  });

  it('should retrieve a course by ID', () => {
    const courseId = coursesMockedData[0].id;
    const course = service.getItemById(courseId);
    expect(course).toEqual(coursesMockedData[0]);
  });

  it('should remove a course', () => {
    const courseId = coursesMockedData[0].id;
    service.removeItem(courseId);
    const courses = service.getList();
    expect(courses.find(course => course.id === courseId)).toBeFalsy();
  });
});
