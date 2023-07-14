import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SectionComponent } from './components/courses/section/section.component';
import { SharedModule } from './shared/shared.module';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from '../app/components/error/error.component';
import { CoursesLayoutComponent } from './components/courses/courses-layout/courses-layout.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AuthEffects } from './store/auth/auth.effects';
import { CoursesEffects } from './store/courses/courses.effects';
import { authReducer } from './store/auth/auth.reducer';
import { coursesReducer } from './store/courses/courses.reducer';
import { courseReducer } from './store/courses/courses.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    SectionComponent,
    LoginComponent,
    ErrorComponent,
    CoursesLayoutComponent,
    CourseInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    EffectsModule.forRoot([AuthEffects, CoursesEffects]),
    ReactiveFormsModule,
    StoreModule.forRoot({
      auth: authReducer,
      courses: coursesReducer,
      course: courseReducer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
