import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/tutorial';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);

    //const body = { title: request.body.title };

    const reqCopy = request.clone({
      //body,
    });

    if (baseUrl && request.url.startsWith(baseUrl)) {
      if (
        request.method == 'POST' &&
        request.url == 'localhost:8000/tutorials'
      ) {
        console.log(request.body);
      }
    }
    return next.handle(request);
  }
}
