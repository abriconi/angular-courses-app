import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  CreateCourseActionTypes,
  createCourseFail,
  createCourseSuccess,
  DeleteCourseActionTypes,
  deleteCourseFail,
  deleteCourseSuccess,
  GetAuthorsActionTypes,
  getAuthorsSuccess,
  GetCourseActionTypes,
  getCourseFail,
  GetCoursesActionTypes,
  getCoursesFail,
  getCoursesSuccess,
  getCourseSuccess,
  UpdateCourseActionTypes,
  updateCourseFail,
  updateCourseSuccess
} from './courses.actions';
import { Authors, COURSE_MODEL } from 'src/app/utilus/global.moduls';

@Injectable()
export class CoursesEffects {
  getCourses$ = createEffect(() =>
  { return this.actions$.pipe(
    ofType(GetCoursesActionTypes.GetCourses),
    mergeMap(({ amount, textFragment }) =>
      this.http.get<COURSE_MODEL[]>(
        `http://localhost:3004/courses?textFragment=${textFragment || ''}&sort=date&start=0&count=${amount}`
      ).pipe(
        map((data) => getCoursesSuccess({ courses: data })),
        catchError((error) => of(getCoursesFail({ error: error.message })))
      )
    )
  ) }
  );

  updateCourse$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(UpdateCourseActionTypes.UpdateCourse),
      mergeMap(({ id, courseData }) =>
        this.http.patch<{ course: COURSE_MODEL }>(
          `http://localhost:3004/courses/${id}`,
          courseData
        )
      ),
      map((data) => updateCourseSuccess(data)),
      catchError((error) => of(updateCourseFail({ error: error.message })))
    )
  });

  getCourse$ = createEffect(() =>
  { return this.actions$.pipe(
    ofType(GetCourseActionTypes.GetCourse),
    mergeMap(({ id }) =>
      this.http.get<{course: COURSE_MODEL}>(
        `http://localhost:3004/courses/${id}`
      )
    ),
    map((data) => getCourseSuccess(data)),
    catchError((error) => of(getCourseFail({error: error.message})))
    )
  });

  createCourse$ = createEffect(() =>
  { return this.actions$.pipe(
    ofType(CreateCourseActionTypes.CreateCourse),
    mergeMap(({ newCourse }) =>
      this.http.post<{course: COURSE_MODEL}>(
        'http://localhost:3004/courses',
        newCourse
      )
    ),
    map((data) => createCourseSuccess(data)),
    catchError((error) => of(createCourseFail({error: error.message})))
    ) }
  );


  deleteCourse$ = createEffect(() =>
  {
    return this.actions$.pipe(
    ofType(DeleteCourseActionTypes.DeleteCourse),
    mergeMap(({ id }) =>
      this.http.delete<{course: COURSE_MODEL}>(
        `http://localhost:3004/courses/${id}`,
        id
      )
    ),
    map(() => deleteCourseSuccess()),
    catchError((error) => of(deleteCourseFail({ error: error.message })))
  )
  });

  getAuthors$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(GetAuthorsActionTypes.GetAuthors),
      mergeMap(() =>
        this.http.get<Authors[]>(
          'http://localhost:3004/authors'
          )
      ),
      map((data) => getAuthorsSuccess({ authors: data })),
      catchError((error) => of(getCoursesFail({ error: error.message })))
    )
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
