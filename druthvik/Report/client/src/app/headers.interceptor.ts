import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/tutorial';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    const apiKey = 'Druthvik';

    request = request.clone({
      setHeaders: {
        Headers: apiKey,
      },
    });

    return next.handle(request);
  }
}
