import { createAction, props } from '@ngrx/store';
import { COURSE_MODEL, Authors } from 'src/app/utilus/global.moduls';

export enum GetCoursesActionTypes {
  GetCourses = '[Courses] Get Courses',
  GetCoursesSuccess = '[Courses] Get Courses Success',
  GetCoursesFail = '[Courses] Get Courses Fail',
}

export enum DeleteCourseActionTypes {
  DeleteCourse = '[Course] Delete Course',
  DeleteCourseSuccess = '[Course] Delete Course Success',
  DeleteCourseFail = '[Course] Delete Course Fail',
}

export enum CreateCourseActionTypes {
  CreateCourse = '[Course] Create Course',
  CreateCoursesSuccess = '[Course] Create Course Success',
  CreateCourseFail = '[Course] Create Course Fail',
}


export enum GetCourseActionTypes {
  GetCourse = '[Course] Get Course',
  GetCourseSuccess = '[Course] Get Course Success',
  GetCourseFail = '[Course] Get Course Fail',
  GetAuthors = "GetAuthors"
}

export enum UpdateCourseActionTypes {
  UpdateCourse = '[Course] Update Course',
  UpdateUpdateCourseSuccess = '[Course] Update Course Success',
  UpdateUpdateCourseFail = '[Course] Update Course Fail',
}

export enum GetAuthorsActionTypes {
  GetAuthors = '[Authors] Get Authors',
  GetAuthorsSuccess = '[Authors] Get Authors Success',
  GetAuthorsFail = '[Authors] Get Authors Fail',
}

export const getAuthors = createAction(
  GetAuthorsActionTypes.GetAuthors,
);

export const getAuthorsSuccess = createAction(
  GetAuthorsActionTypes.GetAuthorsSuccess,
  props<{authors: Authors[]}>()
);

export const getAuthorsFail = createAction(
  GetAuthorsActionTypes.GetAuthorsFail,
  props<{error: string}>()
);

export const getCourses = createAction(
  GetCoursesActionTypes.GetCourses,
  props<{ amount: number, textFragment: string }>()
);

export const getCoursesSuccess = createAction(
  GetCoursesActionTypes.GetCoursesSuccess,
  props<{courses: COURSE_MODEL[]}>()
);

export const getCoursesFail = createAction(
  GetCoursesActionTypes.GetCoursesFail,
  props<{ error: string }>()
);

export const deleteCourse = createAction(
  DeleteCourseActionTypes.DeleteCourse,
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  DeleteCourseActionTypes.DeleteCourseSuccess,
);

export const deleteCourseFail = createAction(
  DeleteCourseActionTypes.DeleteCourseFail,
  props<{ error: string }>()
);

export const createCourse = createAction(
  CreateCourseActionTypes.CreateCourse,
  props<{ newCourse: Omit<COURSE_MODEL, 'id'> }>()
);

export const createCourseSuccess = createAction(
  CreateCourseActionTypes.CreateCoursesSuccess,
  props<{ course: COURSE_MODEL }>()
);

export const createCourseFail = createAction(
  CreateCourseActionTypes.CreateCourseFail,
  props<{ error: string }>()
);

export const getCourse = createAction(
  GetCourseActionTypes.GetCourse,
  props<{ id: number }>()
);

export const getCourseSuccess = createAction(
  GetCourseActionTypes.GetCourseSuccess,
  props<{ course: COURSE_MODEL }>()
);

export const getCourseFail = createAction(
  GetCourseActionTypes.GetCourseFail,
  props<{ error: string }>()
);

export const updateCourse = createAction(
  UpdateCourseActionTypes.UpdateCourse,
  props<{ id: number, courseData: Partial<COURSE_MODEL> }>()
);

export const updateCourseSuccess = createAction(
  UpdateCourseActionTypes.UpdateUpdateCourseSuccess,
  props<{ course: COURSE_MODEL }>()
);

export const updateCourseFail = createAction(
  UpdateCourseActionTypes.UpdateUpdateCourseFail,
  props<{ error: string }>()
);
