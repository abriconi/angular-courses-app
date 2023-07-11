import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(() => {
    routerNavigateSpy = jasmine.createSpy('navigate');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, AuthGuard, { provide: Router, useValue: {navigate: routerNavigateSpy} }]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('returns false when requiresLogin is true and isAuthenticated$ is false', (done) => {
      const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
      const state = { url: 'test' } as RouterStateSnapshot;

     authService.isAuthenticated$ = new BehaviorSubject<boolean>(false);

      guard.canActivate(route, state).subscribe((canActivate) => {
        expect(canActivate).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: state.url } });
        done();
      });

    });


    it('returns true when requiresLogin is true and isAuthenticated$ is true', (done) => {
      const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
      const state = { url: 'test' } as RouterStateSnapshot;

      authService.isAuthenticated$ = new BehaviorSubject<boolean>(true);

      guard.canActivate(route, state).subscribe((canActivate) => {
        expect(canActivate).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });

  });
});
