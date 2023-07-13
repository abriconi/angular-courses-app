import { createAction, props } from '@ngrx/store';
import { COURSE_MODEL, Authors } from 'src/app/utilus/global.moduls';

export enum GetCoursesActionTypes {
  GetCourses = 'Get Courses',
  GetCoursesSuccess = 'Get Courses Success',
  GetCoursesFail = 'Get Courses Fail',
}

export enum DeleteCourseActionTypes {
  DeleteCourse = 'Delete Course',
  DeleteCourseuccess = 'Delete Course Success',
  DeleteCourseFail = 'Delete Course Fail',
}

export enum CreateCourseActionTypes {
  CreateCourse = 'Create Course',
  CreateCoursesSuccess = 'Create Course Success',
  CreateCourseFail = 'Create Course Fail',
}

export enum GetCourseActionTypes {
  GetCourse = 'Get Course',
  GetCourseSuccess = 'Get Course Success',
  GetCourseFail = 'Get Course Fail',
}

export enum UpdateCourseActionTypes {
  UpdateCourse = 'Update Course',
  UpdateUpdateCourseSuccess = 'Update Course Success',
  UpdateUpdateCourseFail = 'Update Course Fail',
}

export const getCourses = createAction(
  GetCoursesActionTypes.GetCourses,
  props<{ amount: number, textFragment: string }>()
  // props<{ pageNumber: number, pageSize: number, textFragment: string }>()
);

export const getCoursesSuccess = createAction(
  GetCoursesActionTypes.GetCoursesSuccess,
  props<{ courses: COURSE_MODEL[] }>()
);

export const getCoursesFail = createAction(
  GetCoursesActionTypes.GetCoursesSuccess,
  props<{ error: string }>()
);

export const deleteCourse = createAction(
  DeleteCourseActionTypes.DeleteCourse,
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  DeleteCourseActionTypes.DeleteCourse,
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
  props<{ id: number, courseData: Omit<COURSE_MODEL, 'id'> }>()
);

export const updateCourseSuccess = createAction(
  UpdateCourseActionTypes.UpdateUpdateCourseSuccess,
  props<{ course: COURSE_MODEL }>()
);

export const updateCourseFail = createAction(
  UpdateCourseActionTypes.UpdateUpdateCourseFail,
  props<{ error: string }>()
);
