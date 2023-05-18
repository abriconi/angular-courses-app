import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { ButtonComponent } from './common/button/button.component';
import { InputComponent } from './common/input/input.component';
import { TextareaComponent } from './common/textarea/textarea.component';
import { CourseFormComponent } from './common/course-form/course-form.component';
import { DeleteCourseComponent } from './common/delete-course/delete-course.component';
import { BreadcrumbsComponent } from './common/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CreateCourseComponent,
    CoursesComponent,
    CourseInfoComponent,
    EditCourseComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    CourseFormComponent,
    DeleteCourseComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
