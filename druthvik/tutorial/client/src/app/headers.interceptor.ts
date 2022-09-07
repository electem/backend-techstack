import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from './models/tutorial.model';
import { TutorialService } from './services/tutorial.service';
import { FormTutorialComponent } from './components/form-tutorial/form-tutorial.component';

const baseUrl = 'http://localhost:8000/tutorial';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
    categories: [],
  };

  constructor(private tutorialService: TutorialService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log(request);
    // const apiKey = 'Druthvik';

    // request = request.clone({
    //   setHeaders: {
    //     Headers: apiKey,
    //   },
    // });

    return next.handle(request);
  }
}
