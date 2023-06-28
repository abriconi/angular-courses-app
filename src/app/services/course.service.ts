import { Injectable } from '@angular/core';
import { Authors, COURSE_MODEL } from '../utilus/global.moduls';
import { authorsMockedData, coursesMockedData } from '../utilus/global.constans';
import { generateId } from '../utilus/helpers';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  static courses: COURSE_MODEL[] = coursesMockedData;
  static authors: Authors[] = authorsMockedData

  getList(): COURSE_MODEL[] {
    return CourseService.courses;
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
    CourseService.courses.push(newCourse);

    return newCourse;
  }

  getItemById(id: number): COURSE_MODEL | undefined {
    return this.getList().find(course => course.id === id)
  }

  updateItem(courseId: number, newCourseData: Omit<COURSE_MODEL, 'id' | 'isTopRated'>): void {
    const courseToUpdate = this.getItemById(courseId);

    if (courseToUpdate) {
      for (const field in newCourseData) {
        if (field !== 'id' && field !== 'isTopRated') {
          (courseToUpdate as any)[field] = (newCourseData as any)[field];
        }
      }
    }
    console.log('1', CourseService.courses);

  }

  removeItem(id: number): void {
    const index = CourseService.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      CourseService.courses.splice(index, 1);
    }
  }
}
