import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem("token")
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set(
          'Authorization', `Token token=${token}`
        )
      })
      return next.handle(authRequest)
    }
    return next.handle(request);
  }
}
