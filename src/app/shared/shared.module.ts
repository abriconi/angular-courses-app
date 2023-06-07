import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BreadcrumpsComponent } from './components/breadcrumps/breadcrumps.component';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesItemComponent } from './components/courses-item/courses-item.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

import { HighlightDirective } from './directives/highlight/highlight.directive';

import { OrderByPipe } from './pipes/orderBy.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumpsComponent,
    CoursesItemComponent,
    HighlightDirective,
    OrderByPipe,
    DurationPipe,
    FilterPipe,

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
    OrderByPipe,
    DurationPipe,
    FilterPipe,
  ],
})
export class SharedModule { }
