import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authors, COURSE_MODEL } from '../utilus/global.moduls';
import { authorsMockedData } from '../utilus/global.constans';
import { generateId } from '../utilus/helpers';
import { BehaviorSubject } from 'rxjs';
import { OrderByPipe } from '../shared/pipes/orderBy.pipe';

@Injectable({
  providedIn: 'root',
})

export class CourseService {

  static coursesList: COURSE_MODEL[] = [];

  coursesListSubject = new BehaviorSubject<COURSE_MODEL[] | []>([]);
  coursesList$ = this.coursesListSubject.asObservable();

  coursesSubject = new BehaviorSubject<COURSE_MODEL[] | []>([]);
  courses$ = this.coursesSubject.asObservable();

  static authors: Authors[] = authorsMockedData;
  private pageSize = 3;
  private pageNumber = 1

  constructor (
    private http: HttpClient,
    // private orderByPipe: OrderByPipe,
  ) {}
//TODO
  getList(): void {
    this.http.get<COURSE_MODEL[]>('http://localhost:3004/courses')
    .subscribe((data) => {
      // const coursesData = this.sortCoursesByCreationDate(data);
      const coursesData = data;
      this.coursesListSubject.next(coursesData);
    });
  }
  // private sortCoursesByCreationDate(courses: COURSE_MODEL[] | []): COURSE_MODEL[] | [] {
  //   return this.orderByPipe.transform(courses);
  // }

  displayCourses(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.getList();
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.coursesList$.subscribe((coursesList) => {
      if (coursesList.length > 0) {
        const displayedCourses = coursesList.slice(0, endIndex);
        this.coursesSubject.next(displayedCourses);
      }
    });
  }

  getAuthorsList(): Authors[] {
    return CourseService.authors;
  }

  courseCreated(newCourseData: Omit<COURSE_MODEL, 'id' | 'isTopRated'>): COURSE_MODEL {

    const newCourseID = generateId();

    const newCourse: COURSE_MODEL = {
      id: newCourseID,
      isTopRated: false,
      name: newCourseData.name,
      date: newCourseData.date,
      length: Number(newCourseData.length),
      description: newCourseData.description,
      authors: newCourseData.authors
    }
    // this.courses$.push(newCourse)
    // CourseService.courses.push(newCourse);

    return newCourse;
  }

  getItemById(id: number): COURSE_MODEL | undefined {
    return ;
    // return this.getList().find(course => course.id === id)
    // return CourseService.courses.find(course => course.id === id)
  }

  updateItem(courseId: number, newCourseData: Omit<COURSE_MODEL, 'id' | 'isTopRated'>): void {
    // const courseToUpdate = this.getItemById(courseId);

    // if (courseToUpdate) {
    //   for (const field in newCourseData) {
    //     if (field !== 'id' && field !== 'isTopRated') {
    //       (courseToUpdate as any)[field] = (newCourseData as any)[field];
    //     }
    //   }
    // }
    // console.log('1', CourseService.courses);

  }

  removeItem(id: number): void {
  //   const index = CourseService.courses.findIndex(course => course.id === id);
  //   if (index !== -1) {
  //     CourseService.courses.splice(index, 1);
  //   }
  }
}
