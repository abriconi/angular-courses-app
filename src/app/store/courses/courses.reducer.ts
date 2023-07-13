import { createReducer, on } from '@ngrx/store';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';
import {
  createCourseFail,
  createCourseSuccess,
  deleteCourseFail,
  deleteCourseSuccess,
  getCourseFail,
  getCoursesFail,
  getCoursesSuccess,
  getCourseSuccess,
  updateCourseFail,
  updateCourseSuccess
} from './courses.actions';

export interface CourseState {
  course: COURSE_MODEL | null;
  error: string | null;
}
export interface CoursesListState {
  coursesList: COURSE_MODEL[] | [];
  error: string | null;
}

const initialCourseState: CourseState = {
  course: null,
  error: null,
};

const initialCoursesListState: CoursesListState = {
  coursesList: [],
  error: null,
}

export const coursesReducer = createReducer(
  initialCoursesListState,
  on(getCoursesSuccess, (state, { courses } ): any => {
    return {
      ...state,
      courses,
      error: null,
    }
  }),
  on(getCoursesFail, (state, { error } ): any => ({
    ...state,
    error
  })),
);

export const courseReducer = createReducer(
  initialCourseState,
  on(deleteCourseSuccess, (state): any => ({
    ...state,
    error: null
  })),
  on(deleteCourseFail, (state, { error } ): any => {
    return {
      ...state,
      error
    }
  }),
  on(createCourseSuccess, (state, { course }): any => {
    return {
      ...state,
      course: course,
      error: null,
    }
  }),
  on(createCourseFail, (state, { error }): any => {
    return {
      ...state,
      error
    }
  }),
  on(getCourseSuccess, (state, { course }): any => {
    return {
      ...state,
      course: course,
      error: null,
    }
  }),
  on(getCourseFail, (state, { error }): any => {
    return {
      ...state,
      error
    }
  }),
  on(updateCourseSuccess, (state, { course }): any => {
    return {
      ...state,
      course: course,
      error: null,
    }
  }),
  on(updateCourseFail, (state, { error }): any => {
    return {
      ...state,
      error
    }
  }),
)

