import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesItemComponent } from './components/courses-item/courses-item.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { InputComponent }  from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { LoadingBlockComponent } from './loading-block/loading-block.component';

import { HighlightDirective } from './directives/highlight/highlight.directive';
import { IfAuthenticatedDirective } from './directives/ifAuthenticated/if-authenticated.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { CustomReuseStrategy } from './custom-reuse-strategy/custom-reuse-strategy';



@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumbsComponent,
    CoursesItemComponent,
    ConfirmationModalComponent,
    InputComponent,
    TextareaComponent,
    LoadingBlockComponent,
    HighlightDirective,
    IfAuthenticatedDirective,
    DurationPipe,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    LogoComponent,
    IconComponent,
    SearchFormComponent,
    BreadcrumbsComponent,
    CoursesItemComponent,
    ConfirmationModalComponent,
    InputComponent,
    TextareaComponent,
    LoadingBlockComponent,
    HighlightDirective,
    IfAuthenticatedDirective,
    DurationPipe,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ]
})
export class SharedModule { }
