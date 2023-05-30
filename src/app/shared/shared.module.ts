import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumpsComponent } from './components/breadcrumps/breadcrumps.component';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { CoursesItemComponent } from './components/courses-item/courses-item.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HighlightDirective } from './directives/highlight/highlight.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
    HighlightDirective,
  ],
})
export class SharedModule { }
