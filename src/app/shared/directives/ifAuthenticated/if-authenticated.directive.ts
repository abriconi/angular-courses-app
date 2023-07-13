import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective implements OnDestroy {
  private isAuthenticated$!: Subscription;
  private isAuthenticated = false;
  private condition = false;
  private destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store.select((selectIsAuthenticated)).subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.handleDisplay();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.isAuthenticated$.unsubscribe;
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
