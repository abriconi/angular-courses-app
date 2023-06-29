import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SectionComponent } from './components/courses/section/section.component';
import { SharedModule } from './shared/shared.module';
import { CourseInfoModule } from './course-info-module/course-info-module.module';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from '../app/components/error/error.component';
import { CoursesLayoutComponent } from './components/courses/courses-layout/courses-layout.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    CourseInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
