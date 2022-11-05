import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    const apiKey = 'Headers';

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('tokens'),
      },
    });
    console.log(localStorage.getItem('tokens'));

    return next.handle(request);
  }
}
