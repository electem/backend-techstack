import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    
   const apiKey = 'Shubhankar Singh'
    request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('tokens'),
        }
    })
     return next.handle(request);
  }
}
