import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the authorization token from storage (e.g., local storage)
    const token = localStorage.getItem('auth_token');

    // Clone the request and add the authorization header
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pass the modified request to the next interceptor or the HTTP handler
    return next.handle(authReq);
  }
}
