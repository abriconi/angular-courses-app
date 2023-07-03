import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authors, COURSE_MODEL } from '../utilus/global.moduls';
import { authorsMockedData } from '../utilus/global.constans';
import { generateId } from '../utilus/helpers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CourseService {

  private pageNumber!: number;
  private textFragment!: string | undefined;

  static coursesList: COURSE_MODEL[] = [];
  static authors: Authors[] = authorsMockedData;

  coursesSubject = new BehaviorSubject<COURSE_MODEL[] | []>([]);
  courses$ = this.coursesSubject.asObservable();



  constructor (
    private http: HttpClient,
  ) {}

  getList(
    pageNumber: number,
    pageSize: number,
    textFragment?: string
    ): void {

    this.pageNumber = pageNumber;
    this.textFragment = textFragment;

    const amount = pageNumber * pageSize;

    this.http.get<COURSE_MODEL[]>(
      `http://localhost:3004/courses?textFragment=${textFragment || ''}&sort=date&start=0&count=${amount}`
      ).subscribe((data) => {
        const coursesData = data;
        this.coursesSubject.next(coursesData);
      }
    );
  }

  removeItem(id: number): void {
    this.http.delete<COURSE_MODEL>(`http://localhost:3004/courses/${id}`)
    .subscribe(() => {
      this.getList(this.pageNumber, 3, this.textFragment)
    })
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


}
