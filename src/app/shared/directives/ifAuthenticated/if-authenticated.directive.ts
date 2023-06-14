import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set ifAuthenticated(condition: boolean) {
    if (condition && this.authService.isAuthenticated()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
