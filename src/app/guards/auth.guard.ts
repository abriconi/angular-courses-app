import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiresLogin = route.data['requiresLogin'];

    return this.authService.isAuthenticated$.pipe(
      map((isAuthenticated: boolean) => {
        if (requiresLogin && !isAuthenticated) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        return true;
      })
    );
  }
}
