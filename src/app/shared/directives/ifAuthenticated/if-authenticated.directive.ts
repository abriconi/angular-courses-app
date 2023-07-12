import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective implements OnDestroy {
  private isAuthenticated = false;
  private condition = false;
  private destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {
    this.store.select(selectIsAuthenticated).pipe( takeUntil(this.destroy$)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.handleDisplay();
    })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
