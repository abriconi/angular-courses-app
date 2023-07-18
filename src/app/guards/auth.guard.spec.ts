import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let routerNavigateSpy: jasmine.Spy;
  let store: MockStore;

  beforeEach(() => {
    routerNavigateSpy = jasmine.createSpy('navigate');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: {navigate: routerNavigateSpy} },
        provideMockStore({ initialState: { auth: { isAuthenticated: false } } } as any),
      ]
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('returns false when requiresLogin is true and isAuthenticated$ is false', (done) => {
      const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
      const state = { url: 'test' } as RouterStateSnapshot;

      store.setState({ auth: { isAuthenticated: false } })

      guard.canActivate(route, state).subscribe((canActivate) => {
        expect(canActivate).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: state.url } });
        done();
      });

    });


    it('returns true when requiresLogin is true and isAuthenticated$ is true', (done) => {
      const route = { data: { requiresLogin: true } } as unknown as ActivatedRouteSnapshot;
      const state = { url: 'test' } as RouterStateSnapshot;

      store.setState({ auth: { isAuthenticated: true } })

      guard.canActivate(route, state).subscribe((canActivate) => {
        expect(canActivate).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });

  });
});
