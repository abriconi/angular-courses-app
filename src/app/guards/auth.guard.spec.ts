import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, of, take } from 'rxjs';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, AuthGuard, { provide: Router, useValue: {} }]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(guard).toBeTruthy();
  });

  // describe('canActivate', () => {
  //   it('returns false when requiresLogin is true and isAuthenticated$ is false', (done) => {
  //     const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
  //     const state = { url: 'test' } as RouterStateSnapshot;

  //     const isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  //     spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(isAuthenticatedSubject);
  //     const navigateSpy = spyOn(router, 'navigate');

  //     guard.canActivate(route, state).subscribe((canActivate) => {
  //       expect(canActivate).toBe(false);
  //       expect(navigateSpy).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: state.url } });
  //       done();
  //     });

  //     isAuthenticatedSubject.next(false);
  //   });

    // it('returns true when requiresLogin is true and isAuthenticated$ is true', (done) => {
    //   const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
    //   const state = { url: 'test' } as RouterStateSnapshot;

    //   spyOnProperty(authService, 'isAuthenticated$').and.returnValue(of(true));
    //   const navigateSpy = spyOn(router, 'navigate');

    //   guard.canActivate(route, state).subscribe((canActivate) => {
    //     expect(canActivate).toBe(true);
    //     expect(navigateSpy).not.toHaveBeenCalled();
    //     done();
    //   });
    // });

    // it('returns true when requiresLogin is false', (done) => {
    //   const route = { data: { requiresLogin: false } } as unknown as ActivatedRouteSnapshot;
    //   const state = { url: 'test' } as RouterStateSnapshot;

    //   const navigateSpy = spyOn(router, 'navigate');

    //   guard.canActivate(route, state).subscribe((canActivate) => {
    //     expect(canActivate).toBe(true);
    //     expect(navigateSpy).not.toHaveBeenCalled();
    //     done();
    //   });
    // });
  // });
});
