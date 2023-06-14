import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective {
  private isAuthenticated = false;
  private condition = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.handleDisplay();
    })
  }

  @Input() set appIfAuthenticated(condition: boolean) {
    this.condition = condition;
    this.handleDisplay();
  }

  handleDisplay() {
    if (this.condition && this.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
