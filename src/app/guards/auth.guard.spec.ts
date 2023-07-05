import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const canActivateStub = () => ({ canActivate: () => true });

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AuthGuard, useValue: canActivateStub}
      ]
    });

  });

  it('can load instance', () => {
    const routerStubInit = () => ({ navigate: () => ({}) });
    TestBed.configureTestingModule({
        providers: [
            AuthGuard,
            { provide: Router, useFactory: routerStubInit },
        ]
    });
    guard = TestBed.inject(AuthGuard);

    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('returns false when requiresLogin', () => {
      const routerStubInit = () => ({ navigate: () => ({}) });
      TestBed.configureTestingModule({
          providers: [
              AuthGuard,
              { provide: Router, useFactory: routerStubInit },
          ]
      });
      guard = TestBed.inject(AuthGuard);

      const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
      const state = { url: 'test' } as RouterStateSnapshot;

      expect(guard.canActivate(route, state)).toEqual(false);
    });
  });
});
