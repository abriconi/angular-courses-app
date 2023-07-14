import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import {
  CreateCourseActionTypes,
  createCourseFail,
  createCourseSuccess,
  DeleteCourseActionTypes,
  deleteCourseFail,
  deleteCourseSuccess,
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
import { ajax } from 'rxjs/ajax';
import { COURSE_MODEL } from 'src/app/utilus/global.moduls';

@Injectable()
export class CoursesEffects {

  getCourses$ = createEffect((): any =>
    { return this.actions$.pipe(
      ofType(GetCoursesActionTypes.GetCourses),
      mergeMap(({ amount, textFragment }) =>
      ajax({
        url: `http://localhost:3004/courses?textFragment=${textFragment || ''}&sort=date&start=0&count=${amount}`,
        method: 'GET',
        body: { amount, textFragment },
        headers: {
          'Content-Type': 'application/json'
        }
      })),
      concatMap(({ response }: any) => {
        const data  = response as COURSE_MODEL[]
        console.log('data', data);

        return of(getCoursesSuccess({ courses: data }));
      }),
      catchError((error) => of(getCoursesFail({ error: error.message })))
    )
  });

  updateCourse$ = createEffect((): any =>
    { return this.actions$.pipe(
      ofType(UpdateCourseActionTypes.UpdateCourse),
      mergeMap(({ id, newCourse }) =>
        ajax({
          url: `http://localhost:3004/courses/${id}`,
          method: 'PATCH',
          body: { newCourse },
          headers: {
            'Content-Type': 'application/json'
          }
        }).pipe(
          map(({ response }) => {
            const data  = response as {course: COURSE_MODEL }
            return data;
          }),
        )
      ),
      concatMap((data): any => {
        return of(
          updateCourseSuccess(data),
        );
      }),
      catchError((error) => of(updateCourseFail({ error: error.message })))
    )
  });

  getCourse$ = createEffect((): any =>
  { return this.actions$.pipe(
    ofType(GetCourseActionTypes.GetCourse),
    mergeMap(({ id }) =>
      ajax({
        url: `http://localhost:3004/courses/${id}`,
        method: 'GET',
        body: { id },
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(({ response }) => {
          const data  = response as {course: COURSE_MODEL }
          return data;
        }),
      )
    ),
    concatMap((data): any => {
      return of(
        getCourseSuccess(data),
      );
    }),
    catchError((error) => of(getCourseFail({ error: error.message })))
  )
  });

  createCourse$ = createEffect((): any =>
  {
    return this.actions$.pipe(
    ofType(CreateCourseActionTypes.CreateCourse),
    mergeMap(() =>
      ajax({
        url: 'http://localhost:3004/courses',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(({ response }) => {
          const data  = response as {course: COURSE_MODEL }
          return data;
        }),
      )
    ),
    concatMap((data): any => {
      return of(
        createCourseSuccess(data),
      );
    }),
    catchError((error) => of(createCourseFail({ error: error.message })))
  )
  });

  deleteCourse$ = createEffect((): any =>
  { return this.actions$.pipe(
    ofType(DeleteCourseActionTypes.DeleteCourse),
    mergeMap(({ id }) =>
      ajax({
        url: `http://localhost:3004/courses/${id}`,
        method: 'DELETE',
        body: { id },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //add getCourses$
    ),
    concatMap((): any => {
      return of(
        deleteCourseSuccess(),
      );
    }),
    catchError((error) => of(deleteCourseFail({ error: error.message })))
  )
  });


  constructor(
    private actions$: Actions,
  ) {}
}
