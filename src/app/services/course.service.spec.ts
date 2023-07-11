import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    courseService = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const pageNumber = 1;
  const pageSize = 3;
  const textFragment = undefined;

  it('should call getList method with default values', () => {
    courseService.getList(pageNumber, pageSize, textFragment);
    const req = httpMock.expectOne(
      `http://localhost:3004/courses?textFragment=&sort=date&start=0&count=${pageNumber * pageSize}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);

    courseService.courses$.subscribe((courses) => {
      expect(courses).toEqual([]);
    });
  });
});
