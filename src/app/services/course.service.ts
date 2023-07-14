import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authors, COURSE_MODEL } from '../utilus/global.moduls';
import { authorsMockedData } from '../utilus/global.constans';
import { generateId } from '../utilus/helpers';
import { BehaviorSubject, catchError } from 'rxjs';
import { LoadService } from './load.service';

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

  courseSubject = new BehaviorSubject<COURSE_MODEL | null>(null);
  course$ = this.courseSubject.asObservable();


  constructor (
    private http: HttpClient,
    private loadService: LoadService
  ) {}

  // getList(
  //   pageNumber: number,
  //   pageSize: number,
  //   textFragment?: string
  //   ): void {

  //   this.pageNumber = pageNumber;
  //   this.textFragment = textFragment;

  //   const amount = pageNumber * pageSize;

  //   this.loadService.showLoader();

  //   setTimeout(() => {
  //     this.loadService.hideLoader();
  //   }, 1000)

  //   this.http.get<COURSE_MODEL[]>(
  //     `http://localhost:3004/courses?textFragment=${textFragment || ''}&sort=date&start=0&count=${amount}`
  //     ) // TODO
  //     .pipe(catchError((error) => {
  //       console.log(error);
  //       throw new Error (error);

  //     }))
  //     .subscribe((data) => {
  //       this.coursesSubject.next(data);
  //       }
  //     );
  // }

  removeItem(id: number): void {
    this.loadService.showLoader();

    this.http.delete<COURSE_MODEL>(`http://localhost:3004/courses/${id}`).subscribe();
    // this.getList(this.pageNumber, 3, this.textFragment);
    this.loadService.hideLoader();
  }

  getAuthorsList(): Authors[] {
    return CourseService.authors;
  }

  courseCreated(newCourseData: Omit<COURSE_MODEL, 'id' | 'isTopRated'>): void {
    this.loadService.showLoader();

    const newCourseID = generateId();

    const newCourse: COURSE_MODEL = {
      id: newCourseID,
      isTopRated: Math.random() >= 0.5,
      name: newCourseData.name,
      date: newCourseData.date,
      length: Number(newCourseData.length),
      description: newCourseData.description,
      authors: newCourseData.authors
    }

    this.http.post<COURSE_MODEL>('http://localhost:3004/courses', newCourse)
    .subscribe(() => {
      // this.getList(this.pageNumber, 3, this.textFragment);
      this.loadService.hideLoader();
    })

  }

  getItemById(id: number): void {
    this.loadService.showLoader();

    this.http.get<COURSE_MODEL>(`http://localhost:3004/courses/${id}`)
    .subscribe((data) => {
      this.courseSubject.next(data);
      this.loadService.hideLoader();
    })
  }

  updateItem(courseId: number, newCourseData: Omit<COURSE_MODEL, 'id'>): void {
    this.loadService.showLoader();

    const updatedCourse: COURSE_MODEL = {
      id: courseId,
      isTopRated: false,
      name: newCourseData.name,
      date: newCourseData.date,
      length: Number(newCourseData.length),
      description: newCourseData.description,
      authors: newCourseData.authors
    }

    this.http.patch<COURSE_MODEL>(`http://localhost:3004/courses/${courseId}`, updatedCourse)
      .subscribe(() => {
        // this.getList(this.pageNumber, 3, this.textFragment);
        this.loadService.hideLoader();
      });
  }
}
